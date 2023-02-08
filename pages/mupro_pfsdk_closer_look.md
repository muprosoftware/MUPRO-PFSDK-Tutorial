---
layout: my-two-cols
clicks: 2
---

::title::

# Closer look 

::left::

```sh{all|19}{maxHeight:'420px'}
├── cmake
├── CMakeLists.txt
├── extern
├── L0_Base
├── L0_FFT
├── L0_License
├── L0_Log
├── L1_IO
├── L1_PostProcess
├── L1_StructureGenerator
├── L1_Transform
├── L1_Utilities
├── L2_ACCH
├── L2_Defect
├── L2_Elastic
├── L2_Electric
├── L2_Magnetic
├── L2_Msolve
├── L2_TDGL
├── L3_Ferroelectric
├── L3_Metal
├── L3_Micromagnetic
├── not_used
└── README.md
22 directories, 2 files
```

::right::

<div v-click="0" class="ml-5">
<div v-click-hide="1" >

Each module
- has its own folder
- has a level, modules may only use other modules of the same or lower level as itself 

</div>
</div>

<div v-click="1" class="ml-5 absolute top-0">

```sh
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

</div>