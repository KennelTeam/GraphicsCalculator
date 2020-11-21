const app = new Vue({
    el: '#app',
    data: {
        formula: '',
        show_Grid: true,
        zoom: 0,
        prevFunc: 0,
    },
    methods: {
        getFormula() {
            var inputField = document.getElementById("formula-input");
            this.formula = inputField.value;
            console.log(this.formula);
            var func = proc_formula(this.formula);
            console.log(func)
            this.prevFunc = func;
            Redraw(func, 0, 3, 10 * (this.zoom / 100), 10 * (this.zoom / 100))
        },
        showGrid() {
            console.log(this.show_Grid)
        },
        onZoom() {
            Redraw(this.prevFunc, 0, 3, 10 * (this.zoom / 100), 10 * (this.zoom / 100));
            console.log("New zoom: " + this.zoom);
        },
        zoomIn() {
            if (this.zoom != 100) {
                this.zoom++;
                this.onZoom()
            }
        },
        zoomOut() {
            if (this.zoom != 0) {
                this.zoom--;
                this.onZoom();
            }
        }
    }
})