---
layout: my-two-cols
clicks: 3
---

::title::

# Closer look 

::left::

```sh{all|4|5|all}
xcheng@falcon: PhaseFieldSDK/dev/L2_TDGL$ tree 
.
├── CMakeLists.txt
├── interface.f90
├── tdgl_lapack.f90
└── tests
    ├── CMakeLists.txt
    ├── lib.f90
    └── main.f90

1 directory, 6 files
```

<div v-click="2">
<div v-click-hide="3">

- setup subroutine is only for preparing a few variable for future use
- no repeating subroutines anymore

</div>
</div>

::right::

<div v-click="1" class="ml-5">
<div v-click-hide="2">

```cpp
module mod_mupro_tdgl
  use mod_tdgl, only: type_mupro_TDGLContext => type_TDGLContext
end module

module mod_lib_tdgl
  use mod_tdgl, only: type_TDGLContext 
end module
```

- interface for main program user `mod_mupro_tdgl`
- interface for other library modules `mod_lib_tdgl`
- we have a lot more flexibility in terms of what been exposed to others

</div>
</div>

<div v-click="2" class="ml-5 absolute top-0 max-w-full">
<div v-click-hide="3">

```cpp{all} {maxHeight:'420px'}
module mod_tdgl
  use mod_lib_base
  use mod_lib_log
  use mod_lib_fft
  use mod_lib_license
  implicit none

  type :: type_TDGLContext
    real(kind=rdp), dimension(6, 6)::G
    real(kind=rdp) :: kinetic_coefficient !ga
    logical, pointer:: flag_anisotropy
    real(kind=rdp) :: dt
    real(kind=rdp), dimension(:, :, :, :), pointer :: rhs, op
    real(kind=rdp), dimension(:, :, :, :, :), allocatable, private::mmx
    real(kind=rdp), private:: Lpp
  contains
    procedure :: setup => TDGL_lapack_setup
    procedure :: solve => TDGL_lapack_mpi
  end type

contains

  subroutine TDGL_lapack_setup(context)
    class(type_tdglContext), intent(inout)::context
    integer :: i, j, k, l, m, n, o, p, r
    real(kind=rdp), pointer, dimension(:, :, :, :, :)::mmx
      real(kind=rdp), allocatable, dimension(:, :, :, :) :: kk
    real(kind=rdp), dimension(6, 6)::g_voigt
    real(kind=rdp), dimension(3, 3, 3, 3)::g
    real(kind=rdp) :: mult1, mult2
    real(kind=rdp) :: Lpp
    logical::valid
#if !defined(SDKDEV)
    valid = check_validity("tdgl")
#else
    print *, "Skip the license check in tdgl"
#endif

    if (.not. allocated(kk)) allocate (kk(3, Cn3, Cn2, Cn1))
    g_voigt = context%g
    kk(1, :, :, :) = mqk1_3
    kk(2, :, :, :) = mqk2_3
    kk(3, :, :, :) = mqk3_3

    if (.not. allocated(context%mmx)) allocate (context%mmx(3, 3, Cn3, Cn2, Cn1)); mmx = 0.0
    context%Lpp = context%kinetic_coefficient*context%dt
    Lpp = context%Lpp

    do i = 1, 3
    do j = 1, 3
    do k = 1, 3
    do l = 1, 3
    IF (i == j) then; m = i; mult1 = 1.; end if
    IF ((i == 2 .AND. j == 3) .OR. (i == 3 .AND. j == 2)) then; m = 4; mult1 = 1.0; end if
    IF ((i == 1 .AND. j == 3) .OR. (i == 3 .AND. j == 1)) then; m = 5; mult1 = 1.0; end if
    IF ((i == 1 .AND. j == 2) .OR. (i == 2 .AND. j == 1)) then; m = 6; mult1 = 1.0; end if
    IF (k == l) then; n = k; mult2 = 1.; end if
    IF ((k == 2 .AND. l == 3) .OR. (k == 3 .AND. l == 2)) then; n = 4; mult2 = 1.0; end if
    IF ((k == 1 .AND. l == 3) .OR. (k == 3 .AND. l == 1)) then; n = 5; mult2 = 1.0; end if
    IF ((k == 1 .AND. l == 2) .OR. (k == 2 .AND. l == 1)) then; n = 6; mult2 = 1.0; end if
    g(i, j, k, l) = g_voigt(m, n)*mult1*mult2
    end do
    end do
    end do
    end do

    do m = 1, 3
    do n = 1, 3
    do o = 1, 3
    do r = 1, 3
      context%mmx(m, n, :, :, :) = context%mmx(m, n, :, :, :) + g(m, o, n, r)*kk(o, :, :, :)*kk(r, :, :, :)
    end do
    end do
    end do
    end do
    
    context%mmx(1, 1, :, :, :) = 1 + Lpp*context%mmx(1, 1, :, :, :)
    context%mmx(2, 2, :, :, :) = 1 + Lpp*context%mmx(2, 2, :, :, :)
    context%mmx(3, 3, :, :, :) = 1 + Lpp*context%mmx(3, 3, :, :, :)
    context%mmx(1, 2, :, :, :) = Lpp*context%mmx(1, 2, :, :, :)
    context%mmx(1, 3, :, :, :) = Lpp*context%mmx(1, 3, :, :, :)
    context%mmx(2, 3, :, :, :) = Lpp*context%mmx(2, 3, :, :, :)
  end subroutine

  SUBROUTINE TDGL_lapack_mpi(context)
    IMPLICIT NONE
    class(type_tdglContext), intent(inout)::context
    real(kind=rdp), pointer :: rin(:, :, :, :)
    real(kind=rdp), pointer:: pout(:, :, :, :)
    real(kind=rdp) :: Lpp
    COMPLEX(kind=cdp), allocatable :: eta1k(:, :, :), eta2k(:, :, :), eta3k(:, :, :)
    COMPLEX(kind=cdp), allocatable :: Mk1(:, :, :), Mk2(:, :, :), Mk3(:, :, :)
    COMPLEX(kind=cdp) :: Amx(3, 3), Bmx(3)

    INTEGER :: info, i, j, k

    rin => context%rhs
    pout => context%op
    Lpp = context%Lpp

    if (.not. allocated(eta1k)) allocate (eta1k(Cn3, Cn2, Cn1))
    if (.not. allocated(eta2k)) allocate (eta2k(Cn3, Cn2, Cn1))
    if (.not. allocated(eta3k)) allocate (eta3k(Cn3, Cn2, Cn1))

    if (.not. allocated(Mk1)) allocate (Mk1(Cn3, Cn2, Cn1))
    if (.not. allocated(Mk2)) allocate (Mk2(Cn3, Cn2, Cn1))
    if (.not. allocated(Mk3)) allocate (Mk3(Cn3, Cn2, Cn1))

    call forward_mpi(rin(1, :, :, :), Mk1)
    call forward_mpi(rin(2, :, :, :), Mk2)
    call forward_mpi(rin(3, :, :, :), Mk3)
    call forward_mpi(pout(1, :, :, :), eta1k)
    call forward_mpi(pout(2, :, :, :), eta2k)
    call forward_mpi(pout(3, :, :, :), eta3k)

    DO i = 1, Cn3
    DO j = 1, Cn2
    DO k = 1, Cn1
      Amx(1, 1) = context%mmx(1, 1, i, j, k)
      Amx(2, 2) = context%mmx(2, 2, i, j, k)
      Amx(3, 3) = context%mmx(3, 3, i, j, k)
      Amx(1, 2) = context%mmx(1, 2, i, j, k)
      Amx(1, 3) = context%mmx(1, 3, i, j, k)
      Amx(2, 3) = context%mmx(2, 3, i, j, k)
      Amx(2, 1) = Amx(1, 2)
      Amx(3, 1) = Amx(1, 3)
      Amx(3, 2) = Amx(2, 3)
      Bmx(1) = eta1k(i, j, k) - Lpp*Mk1(i, j, k)
      Bmx(2) = eta2k(i, j, k) - Lpp*Mk2(i, j, k)
      Bmx(3) = eta3k(i, j, k) - Lpp*Mk3(i, j, k)

      CALL ZPOSV("L", 3, 1, Amx, 3, Bmx, 3, info)

      IF (info .ne. 0) THEN
        WRITE (*, *) "illegal matrix", info, i, j, k
        WRITE (*, *) "mmx:", context%mmx(:, :, i, j, k)
        WRITE (*, *) "A:", Amx
        WRITE (*, *) "B:", Bmx
      END IF

      eta1k(i, j, k) = Bmx(1)
      eta2k(i, j, k) = Bmx(2)
      eta3k(i, j, k) = Bmx(3)

    end do
    end do
    end do
    call backward_mpi(eta1k, pout(1, :, :, :))
    call backward_mpi(eta2k, pout(2, :, :, :))
    call backward_mpi(eta3k, pout(3, :, :, :))

  END SUBROUTINE TDGL_lapack_mpi

end module
```

</div>
</div>



<div v-click="3" class="ml-5 absolute top-0 max-w-full">
<div v-click-hide="4">

```cpp
type(type_mupro_TDGLContext) :: polarContext
type(type_mupro_TDGLContext) :: octatiltContext

//! setup in main program
polarContext%G = polar_gradient_coefficient
polarContext%dt = dt_for_polar_tdgl
octatiltContext%G = octatilt_gradient_coefficient
octatiltContext%dt = dt_for_octatilt_tdgl
call polarContext%setup()
call octatiltContext%setup()

...

//! evolve order parameter after other calculations
polarContext%rhs => polar_tdgl_driving_force
polarContext%op => polarization_order_parameter 
call polarContext%solve()

octatiltContext%rhs => octatilt_tdgl_driving_force
octatiltContext%op => octatilt_order_parameter 
call octatiltContext%solve()



```

</div>
</div>