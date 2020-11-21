const app = new Vue({
    el: '#app',
    data: {
        formula: '',
        show_Grid: true,
        zoom: 0
    },
    methods: {
        getFormula() {
            console.log(this.formula)
        },
        showGrid() {
            console.log(this.show_Grid)
        },
        onZoom() {
            console.log(this.zoom)
        },
        zoomIn() {
            if (this.zoom != 100) this.zoom++;
            console.log(this.zoom)
        },
        zoomOut() {
            if (this.zoom != 0) this.zoom--;
            console.log(this.zoom)
        }
    }
})