var keywords = {
    'sin': '\\sin',
    'cos': '\\cos',
    'ln': '\\ln',
    'log': '\\log',
    'ctg': '\\cot',
    'tg': '\\tan',
}

function parseToCasual(formula){
    formula = formula.replaceAll(' ', '')

    var brackets = Array()
    var toPop = Array()
    var depth = Array()
    var depthWasThere = Array()

    console.log(formula)

    for(var i = 0; i < formula.length; i++){
        if(formula[i] == ')'){
            toPop.push(2)
        }
        if(formula[i] == '/'){
            formula = formula.substring(0, brackets[brackets.length - 1]) + '\\frac{' + 
                formula.substring(brackets[brackets.length - 1], i) + '}{' + formula.substring(i+1, formula.length);
            depth.push(brackets.length - 1)
            depthWasThere.push(false)
            i += 6
        }
        
        if(toPop.includes(1)){
            brackets.pop()
            console.log('aaaa')
            console.log(i)
            if(depth.includes( brackets.length )){
                if(depthWasThere[depth.indexOf(brackets.length)]){
                    var ind = /*formula[i] == ')' ? i-1 : */i;
                    console.log(formula)
                    console.log(i)
                    console.log("there")
                    formula = formula.substring(0, ind) + '}' + formula.substring(ind, formula.length)
                    depth[depth.indexOf(brackets.length)] = -1
                } else {
                    depthWasThere[depth.indexOf(brackets.length)] = true
                }
                
            }
            toPop[toPop.indexOf(1)] = -1
        }
        if(toPop.includes(2)){
            toPop[toPop.indexOf(2)] = 1
        }
        if(formula[i] == '('){
            brackets.push(i)
        }
    }
    console.log(formula)

    if(toPop.includes(1)){
        brackets.pop()
        if(depth.includes( brackets.length)){
            var ind = /*formula[formula.length - 1] == ')' ? formula.length - 1 : */formula.length;
            console.log(formula)
            console.log(i)
            console.log("here")
            formula = formula.substring(0, ind) + '}' + formula.substring(ind, formula.length)
            depth[depth.indexOf(brackets.length)] = -1
        }
    }

    console.log(formula)

    formula = formula.replaceAll(')', ' \\right)}')
    formula = formula.replaceAll('(', '{\\left( ')
    formula = formula.replaceAll('\*', '\\times ')
    

    for(var key in keywords){
        formula = formula.replaceAll(key, keywords[key])
    }

    //var nFormula = formula


    console.log(formula)

    return formula
}

var app = new Vue({
    el: '#app',
    data: {
        text: ""
    },
    computed: {
        texText(){
            var textLaTeX = parseToCasual(this.text) 

            var a = document.getElementById(1)
            if(a){
                a.remove()
            }

            var d = document.createElement("div")
            d.innerHTML = '<latex-js>\\documentclass{article}\n\\begin{document}\n$$ ' + textLaTeX + ' $$ \n\\end{document}</latex-js>'
            d.id = 1
            document.body.appendChild(d)

            
            return ""
        }
    }
})
