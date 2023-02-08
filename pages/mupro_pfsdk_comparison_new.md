---
layout: my-two-cols
clicks: 3
---

::title::

# Comparison between the old and new design

::left::

<img src="/public/new_design.png" />


<v-click at="1" >

- library <mdi-arrow-right/> module  

</v-click>

<v-click at="2" >

- library <mdi-arrow-right/> module  <mdi-arrow-right/> type  <mdi-arrow-right/> data

</v-click>

<v-click at="3" >

- library <mdi-arrow-right/> module  <mdi-arrow-right/> type  <mdi-arrow-right/> subroutine

</v-click>

::right::



<div v-click="1" class="absolute  top-1/2 left-5">
<div v-click-hide="2"> 

- modules are isolated
- easier to develop and maintain
  
</div>
</div>

<div v-click="2" class="absolute  top-1/2 left-5">
<div v-click-hide="3"> 

- data is no longer directly defined in memory, it only becomes available when user define type object in main program
- no hidden data that needs to get connected to main program because all data are just defined by the users in their main program

</div>
</div>

<div v-click="3" class="absolute  top-1/2 left-5">

- subroutines become reusable. For the polarization and oxygen octahedral tilt example, you just define two object of the same tdgl_context type
- backward compatible. As long as we provide default value for any new data, user's old main program should works fine with any new library

</div>
