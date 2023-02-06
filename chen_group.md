---
marp: true
theme: mupro
paginate: true
---
<!-- _class: lead -->

# MuPRO PhaseFieldSDK tutorial
#### Feat. Software development for our group members 

<br/>

Xiaoxing Cheng

---
<!-- _header: Content -->

1. Tools + Best practices
   - pain points
2. MuPRO PhaseFieldSDK 

---



<!-- _header: Tools + Best practices -->


<div class="twocols">

#### Pain points

- Too many versions for my code
- Cannot reproduce old results
  - code is lost
  - not sure which version to use
- I forget what I changed
- Code no longer build on different environment
- Build speed is slow
- Hard to debug with print *
- Unstable remote connection
  
<p class="break"></p>

#### Solutions

1. Version control system
2. Build system
3. Code editor

</div>


---
<!-- _class: lead-->

# Proper tools are important
![bg right vertical](./images/good.png) 
![bg](./images/bad.png)



---

<!-- _header: Tools - Version control system -->

<div class="twocols">

Benefits include:
- tracking changes
- collaboration
- backup
- branching and merging

Available systems:
- **<span class="secondary">Git</span>**
- Mercurial
- SVN

<p class="break"></p>

Git is a **<span class="primary">must use tool</span>** for any kind of code development. 

Even if you don’t understand why you should use this or feels inconvenient in the beginning, you have to force yourself keep using it.

Git service providers:
- **<span class="secondary">Github</span>**
- Gitlab



---

<!-- 
_header: Best practice - Git 
-->

*-* Use gitignore and only track necessary files
*-* Separate your simulation program from simulation results
*-* Keep commit small, and commit frequently
*-* Keep branching simple, and as short life as possible
*-* Tag your code when necessary
