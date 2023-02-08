---
layout: my-two-cols
---

::title::

# Comparison between the old and new design

::left::

<img src="/public/old_design.png" />

- isolate data in library from the main program
- data are connected through setup subroutines
- all parameter passed as subroutine arguments


<v-click at="1">
<div class="primary">

- long func_module, also keep growing
- poor code reusability
- poor backward compatibility
- hard to develop

</div>
</v-click>

::right::



<div v-click="2" class="absolute  ">
<div v-click-hide="3"> 
<img src="/public/func_module.jpg" />
</div>
</div>

<div v-click="3" class="absolute  ">
<div v-click-hide="4"> 
<img src="/public/poor_reusability.jpg" />
</div>
</div>

<div v-click="4" class="absolute  ">
<img src="/public/poor_backward_compatibility.jpg" />
</div>
