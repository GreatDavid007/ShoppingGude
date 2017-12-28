new Vue({
  el: '#editor',
  data: {
    input: '# hello'
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { 
        gfm: true,
      tables: true,
      breaks: true,
      pedantic: true,
      sanitize: true,
      smartLists: true,
      smartypants: true
       })
    }
  },
  methods: {
    update: _.debounce(function (e) {
      console.log(e);
      this.input = e.target.value
    }, 300)
  }
})