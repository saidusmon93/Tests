<template>
  <!-- HTML ва CSS йордамида форма яратиш керак. -->

  <div class="form">
    <form class="form-group">
      <h1>Forma</h1>
      <div>
        <label for="phone" class="label">Phone <span> *</span></label>
        <input type="number" class="input" id="phone" placeholder="+998991234567" required />
      </div>
      <div>
        <label for="name" class="label">Name<span> *</span></label>
        <input type="text" class="input" id="name" placeholder="Name" required />
      </div>
      <div>
        <label for="passport" class="label">Passport<span> *</span></label>
        <input type="text" class="input" id="passport" placeholder="AB 562314" />
      </div>
      <div>
        <label for="pinfl" class="label">PINFL<span> *</span></label>
        <input type="text" class="input" id="pinfl" placeholder="PINFL" required />
      </div>
      <div>
        <label for="pinfl" class="label">Birthday<span> *</span></label>
        <input type="date" class="input" id="birthday" required />
      </div>

      <button class="btn" type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style>

</style>
