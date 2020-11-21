const operators = new Array("+", "-", "*", "/");

function proc_formula(str) {
    var str = "x*34/(56*x/23-(78*x))+(12+8+x)"
    var bracksParent = parse_brackets(str);
    var expNums = /[0-9]+/g;
    var expVars = /x/g;
    var expOpers = /[-+*/]/g;
    var nums = [...str.matchAll(expNums)];
    var defs = [...str.matchAll(expVars)];
    var opers = [...str.matchAll(expOpers)];
    var allData = new Array();
    allData.push(nums);
    allData.push(defs);
    allData.push(opers);
    console.log(allData);

    var funcParent = generate_pattern(allData, bracksParent);
    console.log(funcParent.calculate(4.78));
    return funcParent;
}

function generate_pattern(allData, bracksUsed, spacer) {
    var weuse = new Array();
    var spacer = new Avaliable_spacer(bracksUsed);

    for (var i = 0; i < allData.length; i++) {
        for (var a = 0; a < allData[i].length; a++) {
            if (spacer.isAvailable(allData[i][a]["index"])) {
                weuse.push({
                    "val": allData[i][a][0],
                    "ind": allData[i][a]["index"]
                });
            }
        }
    }
    for (var i = 0; i < bracksUsed.childs.length; i++) {
        weuse.push({
            "ind": bracksUsed.childs[i].start,
            "val": bracksUsed.childs[i]
        });
    }
    weuse.sort(sort_pattern);

    var toMakeMembers = new Array();
    var toMakeSigns = new Array();

    for (var i = 0; i < weuse.length; i++) {
        if (operators.includes(weuse[i]["val"])) {
            toMakeSigns.push(weuse[i]["val"]);
        } else if (weuse[i]["val"] == "x") {
            toMakeMembers.push(new Func_part());
        } else if (/[0-9]/.test(weuse[i]["val"].toString())) {
            toMakeMembers.push(parseInt(weuse[i]["val"].toString()));
        } else {
            var nber = generate_pattern(allData, weuse[i]["val"]);
            toMakeMembers.push(nber);
        }
    }
    var res = new Func_part();
    res.add_data(toMakeMembers, toMakeSigns);
    return res;
}

function sort_pattern(a, b) {
    if (a["ind"] > b["ind"]) return 1;
    if (b["ind"] > a["ind"]) return -1;
}

function parse_brackets(str) {
    var stack = new Block_el(-1, str.length);

    for (var i = 0; i < str.length; i++) {
        if (str[i] == '(') {
            stack.add_brack(true, i);
        } else if (str[i] == ')') {
            stack.add_brack(false, i);
        }
    }
    stack.print(0)
    return stack;
}

class Func_part {
    constructor() {
        this.isVar = true;
    }

    add_data(members, signs = new Array()) {
        this.members = members;
        this.signs = signs;
        this.isVar = false;
    }

    calculate(x) {
        if (this.isVar) {
            return x;
        } else {
            var res = this.members[0];
            if (!(/[0-9]/.test(res))) {
                res = res.calculate(x);
            }
            this.members.shift();
            console.log("MEMBERS")
            console.log(this.members)
            console.log(this.signs)
            for (var i = 0; i < this.signs.length; i++) {
                var next = this.members[i];
                if (!(/[0-9]/.test(next))) {
                    next = next.calculate(x);
                }
                switch (this.signs[i]) {
                    case "+":
                        {
                            res = res + next;
                            break;
                        }
                    case "-":
                        {
                            res -= next;
                            break;
                        }
                    case "/":
                        {
                            res /= next;
                            break;
                        }
                    case "*":
                        {
                            res *= next;
                            break;
                        }
                }
            }
            return res;
        }
    }
}

class Block_el {
    constructor(start, end = -1) {
        this.childs = new Array();
        this.start = start;
        this.end = end;
    }

    add_brack(isOpen, index) {
        if (isOpen) {
            var ind = this.is_childs_closed;
            if (ind == -1) {
                this.childs.push(new Block_el(index));
            } else {
                this.childs[ind].add_brack(true, index);
            }
        } else {
            var close_me = true;
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i].end == -1) {
                    this.childs[i].add_brack(false, index);
                    close_me = false;
                    break;
                }
            }
            if (close_me) {
                this.end = index;
            }
        }
    }

    print(depth) {
        if (this.start != -1) {
            var stuff = "";
            for (var i = 0; i < depth; i++) {
                stuff += "  ";
            }
        }
        depth += 1;
        for (var i = 0; i < this.childs.length; i++) {
            this.childs[i].print(depth)
        }
    }

    get is_childs_closed() {
        var index = -1;
        for (var i = 0; i < this.childs.length; i++) {
            if (this.childs[i].end == -1) {
                index = i;
            }
        }
        return index;
    }
}

class Avaliable_spacer {
    constructor(bracks) {
        this.min = bracks.start;
        this.max = bracks.end;
        var res = new Array();
        var childs = bracks.childs;
        for (var i = 0; i < childs.length; i++) {
            var d = -1;
            var cs = childs[i].start;
            var ce = childs[i].end;
            for (var a = res.length - 1; a >= 0; a--) {
                if (cs > res[a].start) {
                    d = a;
                    break;
                }
            }
            var toadd = new Array(cs, ce);
            res.splice(d + 1, 0, toadd);
        }
        this.space = res;
    }

    isAvailable(index) {
        var res = true;
        for (var i = 0; i < this.space.length; i++) {
            if (this.space[i][0] <= index && this.space[i][1] >= index) {
                res = false;
            }
        }
        if (index <= this.min || index >= this.max) {
            res = false;
        }
        return res;
    }
}