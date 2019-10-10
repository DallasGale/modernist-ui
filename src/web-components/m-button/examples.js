import '.'
// import './nav_dropdown_item'
import md from './README.md'

// const section = document.getElementById('buttons')
const intro_markdown = document.getElementById('intro_markdown')
const intro_components = document.getElementById('intro_components')

const examples = `
<style>
  .content {
    display: block;
    position: relative;
    margin-bottom: 4rem;
  }
</style>

<div class='content'>
  <h2>Light Mode</h2>

  <code>&#60;modern-button mode="light" type"cta" size="auto"></code>
  <m-button mode="positive">
    Light
  </m-button>
</div>

<div class='content'>
  <h2>Dark Mode</h2>
  <code>&#60;modern-button mode="dark" type"cta" size="half"></code>
  <m-button mode="negative">
    Dark
  </m-button>
</div>

<div class='content'>
  <h2>Accent Mode</h2>

  <code>&#60;modern-button mode="accent" type"cta" size="full"></code>
  <m-button mode="accent">
    Accent
  </m-button>
</div>

`

intro_markdown.innerHTML = md
intro_components.insertAdjacentHTML('afterbegin', examples)
