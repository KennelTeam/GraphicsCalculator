var keywords = {
    'sin': '\\sin',
    'cos': '\\cos',
    'ln': '\\ln',
    'log': '\\log',
    'ctg': '\\cot',
    'tg': '\\tan',
}

function parseToTeX(formula){
    formula = formula.replaceAll(' ', '')

    var match = formula.match('/')
    while(match){
        

        var started1 = false
        var count1 = 0

        for(var i = match.index+1; i < formula.length; i++){
            if(formula[i] == '('){
                started1 = true
                count1 += 1
            }
            if(formula[i] == ')'){
                count1 -= 1
            }
            if(count1 == 0 && started1){
                break;
            }
        }

        var started2 = false
        var count2 = 0

        for(var j = match.index - 1; j > 0; j--){
            if(formula[j] == ')'){
                started2 = true
                count2 += 1
            }
            if(formula[j] == '('){
                count2 -= 1
            }
            if(count2 == 0 && started2){
                break;
            }
        }

        formula = formula.substring(0, j) + '\\frac{' + formula.substring(j+1, match.index-1) + '}{' 
            + formula.substring(match.index + 2, i) + '}' + formula.substring(i+1, formula.length);

        match = formula.match('/')
    }

    formula = formula.replaceAll(')', ' \\right)}')
    formula = formula.replaceAll('(', '{\\left( ')
    formula = formula.replaceAll('\*', '\\times ')
    

    for(var key in keywords){
        formula = formula.replaceAll(key, keywords[key])
    }
    console.log(formula)

    return formula
}

var app1 = new Vue({
    el: '#app1',
    data: {
        text: ""
    },
    methods: {
        recalculate(){
            var textLaTeX = parseToTeX(this.text) 

            var a = document.getElementById("LaTeX-formula")
            if(a){
                a.remove()
            }
            var b = document.getElementById("formula-view")
            var d = document.createElement("div")
            d.innerHTML = '<latex-js>\\documentclass{article}\n\\begin{document}\n$$ ' + textLaTeX + ' $$ \n\\end{document}</latex-js>'
            d.id = "LaTeX-formula"
            b.appendChild(d)
        }
    },
    computed: {
        inputText(){
            this.recalculate();
            return ""
        }
    }
})
