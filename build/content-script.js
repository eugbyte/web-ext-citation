/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content-script/traverse-dom.ts":
/*!********************************************!*\
  !*** ./src/content-script/traverse-dom.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.processElement = void 0;
function processElement(targetElement, copiedText, iteration) {
    if (iteration === void 0) { iteration = 1; }
    console.log("copiedText:\n", copiedText);
    var parentElement = traverseUp(targetElement, "DIV");
    var fullText = parentElement.innerText;
    console.log("fullText:\n", fullText);
    var regex = /\d+\.—\(\d+\)|\n\(\w+\)/g;
    var copiedTextMatches = findMatches(regex, copiedText);
    console.log(copiedTextMatches);
    console.log("-----");
    var parentTextMatches = findMatches(regex, fullText);
    console.log(parentTextMatches);
}
exports.processElement = processElement;
function traverseUp(element, nodeName) {
    if (!(element.nodeName === nodeName)) {
        return traverseUp(element.parentElement, nodeName);
    }
    return element;
}
function findMatches(regex, text) {
    var matches = __spreadArray([], __read(text.matchAll(regex)));
    return matches.map(function (matchArray) {
        if (matchArray.length > 1)
            throw new Error("regex should not contain more than one match as there are no optionals");
        return {
            index: matchArray.index,
            provision: matchArray[0]
        };
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************************************!*\
  !*** ./src/content-script/content-script.ts ***!
  \**********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var traverse_dom_1 = __webpack_require__(/*! ./traverse-dom */ "./src/content-script/traverse-dom.ts");
document.addEventListener('copy', function (event) {
    var _a;
    var copiedText = (_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.toString();
    var targetElement = event.target;
    if (!copiedText)
        return;
    traverse_dom_1.processElement(targetElement, copiedText);
    //(event.clipboardData as DataTransfer).setData('text/plain', modifiedText);
    //(event.clipboardData as DataTransfer).setData('text/html', copiedText + '<b>Source:</b> <a href="' + document.location.href + '">' + document.title + '</a>');
    event.clipboardData.setData('application/xml', "<footnote>Hello</footnote>");
    event.preventDefault();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaXRhdGlvbi1leHRlbnNpb24vLi9zcmMvY29udGVudC1zY3JpcHQvdHJhdmVyc2UtZG9tLnRzIiwid2VicGFjazovL2NpdGF0aW9uLWV4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaXRhdGlvbi1leHRlbnNpb24vLi9zcmMvY29udGVudC1zY3JpcHQvY29udGVudC1zY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQWdCLGNBQWMsQ0FBRSxhQUEwQixFQUFFLFVBQWtCLEVBQUUsU0FBYTtJQUFiLHlDQUFhO0lBRXpGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRXpDLElBQU0sYUFBYSxHQUFnQixVQUFVLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BFLElBQU0sUUFBUSxHQUFXLGFBQWEsQ0FBQyxTQUFTLENBQUM7SUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFckMsSUFBTSxLQUFLLEdBQUcsMEJBQTBCLENBQUU7SUFDMUMsSUFBTSxpQkFBaUIsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7SUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixJQUFNLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFkRCx3Q0FjQztBQUlELFNBQVMsVUFBVSxDQUFDLE9BQW9CLEVBQUUsUUFBZ0I7SUFDdEQsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsRUFBRTtRQUNsQyxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsYUFBNEIsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNyRTtJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxLQUFhLEVBQUUsSUFBWTtJQUM1QyxJQUFNLE9BQU8sNEJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO0lBQzFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFVBQTRCO1FBQzVDLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO1FBQ3JILE9BQU87WUFDSCxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7WUFDdkIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDM0I7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7Ozs7Ozs7VUNsQ0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBLHVHQUE2QztBQUU3QyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBcUI7O0lBQ3BELElBQU0sVUFBVSxHQUF1QixjQUFRLENBQUMsWUFBWSxFQUFFLDBDQUFFLFFBQVEsRUFBRSxDQUFDO0lBQzNFLElBQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFxQixDQUFDO0lBQ2xELElBQUksQ0FBQyxVQUFVO1FBQUUsT0FBTztJQUN4Qiw2QkFBYyxDQUFDLGFBQWEsRUFBRSxVQUFvQixDQUFDLENBQUM7SUFFcEQsNEVBQTRFO0lBQzVFLGdLQUFnSztJQUMvSixLQUFLLENBQUMsYUFBOEIsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztJQUMvRixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDM0IsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiY29udGVudC1zY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0VsZW1lbnQgKHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb3BpZWRUZXh0OiBzdHJpbmcsIGl0ZXJhdGlvbiA9IDEpIHtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcImNvcGllZFRleHQ6XFxuXCIsIGNvcGllZFRleHQpO1xyXG5cclxuICAgIGNvbnN0IHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdHJhdmVyc2VVcCh0YXJnZXRFbGVtZW50LCBcIkRJVlwiKTtcclxuICAgIGNvbnN0IGZ1bGxUZXh0OiBzdHJpbmcgPSBwYXJlbnRFbGVtZW50LmlubmVyVGV4dDtcclxuICAgIGNvbnNvbGUubG9nKFwiZnVsbFRleHQ6XFxuXCIsIGZ1bGxUZXh0KTtcclxuXHJcbiAgICBjb25zdCByZWdleCA9IC9cXGQrXFwu4oCUXFwoXFxkK1xcKXxcXG5cXChcXHcrXFwpL2cgO1xyXG4gICAgY29uc3QgY29waWVkVGV4dE1hdGNoZXMgPSBmaW5kTWF0Y2hlcyhyZWdleCwgY29waWVkVGV4dCk7XHJcbiAgICBjb25zb2xlLmxvZyhjb3BpZWRUZXh0TWF0Y2hlcylcclxuICAgIGNvbnNvbGUubG9nKFwiLS0tLS1cIik7XHJcbiAgICBjb25zdCBwYXJlbnRUZXh0TWF0Y2hlcyA9IGZpbmRNYXRjaGVzKHJlZ2V4LCBmdWxsVGV4dCk7ICAgIFxyXG4gICAgY29uc29sZS5sb2cocGFyZW50VGV4dE1hdGNoZXMpO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHRyYXZlcnNlVXAoZWxlbWVudDogSFRNTEVsZW1lbnQsIG5vZGVOYW1lOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XHJcbiAgICBpZiAoIShlbGVtZW50Lm5vZGVOYW1lID09PSBub2RlTmFtZSkpIHtcclxuICAgICAgICByZXR1cm4gdHJhdmVyc2VVcChlbGVtZW50LnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQsIG5vZGVOYW1lKTsgICAgICAgIFxyXG4gICAgfSBcclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kTWF0Y2hlcyhyZWdleDogUmVnRXhwLCB0ZXh0OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IG1hdGNoZXMgPSBbLi4udGV4dC5tYXRjaEFsbChyZWdleCldO1xyXG4gICAgcmV0dXJuIG1hdGNoZXMubWFwKChtYXRjaEFycmF5OiBSZWdFeHBNYXRjaEFycmF5KSA9PiB7XHJcbiAgICAgICAgaWYgKG1hdGNoQXJyYXkubGVuZ3RoID4gMSkgdGhyb3cgbmV3IEVycm9yKFwicmVnZXggc2hvdWxkIG5vdCBjb250YWluIG1vcmUgdGhhbiBvbmUgbWF0Y2ggYXMgdGhlcmUgYXJlIG5vIG9wdGlvbmFsc1wiKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbmRleDogbWF0Y2hBcnJheS5pbmRleCxcclxuICAgICAgICAgICAgcHJvdmlzaW9uOiBtYXRjaEFycmF5WzBdXHJcbiAgICAgICAgfVxyXG4gICAgfSk7IFxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQge3Byb2Nlc3NFbGVtZW50fSBmcm9tIFwiLi90cmF2ZXJzZS1kb21cIlxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY29weScsIChldmVudDogQ2xpcGJvYXJkRXZlbnQpID0+IHtcclxuICAgIGNvbnN0IGNvcGllZFRleHQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpPy50b1N0cmluZygpO1xyXG4gICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgIGlmICghY29waWVkVGV4dCkgcmV0dXJuO1xyXG4gICAgcHJvY2Vzc0VsZW1lbnQodGFyZ2V0RWxlbWVudCwgY29waWVkVGV4dCBhcyBzdHJpbmcpO1xyXG5cclxuICAgIC8vKGV2ZW50LmNsaXBib2FyZERhdGEgYXMgRGF0YVRyYW5zZmVyKS5zZXREYXRhKCd0ZXh0L3BsYWluJywgbW9kaWZpZWRUZXh0KTtcclxuICAgIC8vKGV2ZW50LmNsaXBib2FyZERhdGEgYXMgRGF0YVRyYW5zZmVyKS5zZXREYXRhKCd0ZXh0L2h0bWwnLCBjb3BpZWRUZXh0ICsgJzxiPlNvdXJjZTo8L2I+IDxhIGhyZWY9XCInICsgZG9jdW1lbnQubG9jYXRpb24uaHJlZiArICdcIj4nICsgZG9jdW1lbnQudGl0bGUgKyAnPC9hPicpO1xyXG4gICAgKGV2ZW50LmNsaXBib2FyZERhdGEgYXMgRGF0YVRyYW5zZmVyKS5zZXREYXRhKCdhcHBsaWNhdGlvbi94bWwnLCBgPGZvb3Rub3RlPkhlbGxvPC9mb290bm90ZT5gKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbn0pO1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==