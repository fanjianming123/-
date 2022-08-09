export const imgError = {
  inserted: function (el, { value }) {
    if (!el.src) {
      el.src = value
    }
    el.onerror = function () {
      el.src = value
    }
  }
}
