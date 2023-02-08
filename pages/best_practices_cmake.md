---
layout: my-two-cols
---
::title::
# CMake best practices

::left::

- do not just copy and paste any CMake file you find online, many of the examples are for legacy cmake
- only learn [Modern CMake](https://cliutils.gitlab.io/modern-cmake/), version higher than 3.12 (or 3.20 even better)
- think from the perspective of **targets** and the **dependencies between targets** when writing cmake files
- use CMakePresets to configure, build, and test
- always do out of source build
- gitignore any cmake generate files

::right::

<div class="left-1/3 absolute top-1/2">

## Modern CMake! 

</div>