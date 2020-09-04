// @ts-check
const $ = (str) => document.querySelector(str);

/**
 * @returns {[string,number[]]}
 */
function genParticlesHtml() {
    const width = window.innerWidth;
    const rowNums = Math.floor(width / 4);
    let innerParticles = '';
    let index = 0;
    const particleIndexes = [];
    for (let i = 0; i < rowNums; i++) {
        for (let j = 0; j < 25 / 2; j++) {
            innerParticles += `<div class="box index-${index++}" style="top:${j * 4}px;left:${i * 4}px"></div>`;
            particleIndexes.push(index);
        }
    }
    return [innerParticles, particleIndexes]
}

/**
 * x^2+y^2 -abs(x) y < 10000
 * @see https://www.wolframalpha.com/input/?i=x%5E2%2By%5E2+-abs%28x%29+y+%3C+10000
 * @param {number} x
 * @param {number} y
 */
function isInHeart(x, y) {
    x = x - 150;
    y = y - 140;
    if (x * x + y * y - Math.abs(x) * y > 10000) {
        return false;
    } else {
        return true;
    }
}
/**
 * @returns {[number,number][]}
 */
function calcValidPosition() {
    const res = [];
    for (let i = 1; i < 300; i += 4) {
        for (let j = 1; j < 300; j += 4) {
            if (isInHeart(i, j)) {
                res.push([i, j])
            }

        }
    }
    return res;
}
/**
 * 
 * @param {[number,number][]} positions 
 * @returns {string}
 */
function genHeartHtml(positions) {
    let html = '';
    positions.forEach(([x, y]) => {
        html += `<div class="heart-particle" style="bottom:${y - 2}px;left:${x - 2}px"></div>`
    })
    return html;
}
window.onload = function () {
    const [innerParticles, particleIndexes] = genParticlesHtml();
    $('.top').innerHTML = innerParticles;
    setTimeout(() => {
        move(particleIndexes);
    }, 0);
};

/**
 * 
 * @param {number[]} particleIndexes 
 */
function move(particleIndexes) {
    particleIndexes.sort(function () {
        return Math.random() - 0.5;
    });
    const positions = calcValidPosition();
    positions.sort(function () {
        return Math.random() - 0.5;
    });
    let i = 0;
    const timer = setInterval(function () {
        const [x, y] = positions[i];
        const index = particleIndexes[i];
        const className = `index-${index}`;
        const element = document.getElementsByClassName(className)[0];
        console.log("→: timer -> className", className)
        console.log("→: timer -> element", element)
        element.style.top = y + 400 + 'px';
        element.style.left = x + 'px';
        i++;
        if (i >= Math.min(positions.length, particleIndexes.length)) {
            clearInterval(timer);
            // const eleList = document.getElementsByClassName('box');
            // Array.from(eleList).forEach(ele => {
            //     ele.style.width = '6px';
            //     ele.style.height = '6px';
            // })
            // setTimeout(function () {
            //     Array.from(eleList).forEach(ele => {
            //         ele.style.width = '4px';
            //         ele.style.height = '4px';
            //     })
            // }, 1000);
        }

    }, 16)

}