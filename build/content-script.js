/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content-script/traverse-dom.ts":
/*!********************************************!*\
  !*** ./src/content-script/traverse-dom.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.traverseUp = void 0;
function traverseUp(targetElement, copiedText, provisions, iteration) {
    if (provisions === void 0) { provisions = []; }
    if (iteration === void 0) { iteration = 1; }
    var regex = /\d+\.—\(\d+\)|\n\(\.+\)/;
    var parent = targetElement.parentElement;
    if (!assertElementType(targetElement, "DIV")) {
        traverseUp(parent, copiedText, provisions, iteration + 1);
        var prevSibling = targetElement.previousElementSibling;
        if (prevSibling && assertElementType(prevSibling, "TD")) {
            var provision = prevSibling.innerText;
            provisions.unshift(provision);
            console.log(targetElement.innerText + "\n", provision + "\n", prevSibling.innerText);
        }
        if (prevSibling == null && assertElementType(targetElement, "TD")) {
            var matches = targetElement.innerText.match(regex);
            if (matches == null)
                return;
            var provision = matches[0];
            provisions.unshift(provision);
            console.log("prevSibling is null\n", provision + "\n", targetElement.innerText);
        }
        return;
    }
    console.log(provisions);
    var innerText = parent.innerText;
    console.log("FOUND: " + innerText.includes(copiedText));
    var startIndex = innerText.indexOf(copiedText);
    var endIndex = startIndex + copiedText.length;
    console.log(startIndex, endIndex);
}
exports.traverseUp = traverseUp;
// An element is a container if it contains the entire section of the statute, as opposed to the sub section 
function assertElementType(element, matcher) {
    return element.nodeName === matcher;
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
    traverse_dom_1.traverseUp(targetElement, targetElement.innerText);
    //(event.clipboardData as DataTransfer).setData('text/plain', modifiedText);
    //(event.clipboardData as DataTransfer).setData('text/html', copiedText + '<b>Source:</b> <a href="' + document.location.href + '">' + document.title + '</a>');
    event.clipboardData.setData('application/xml', "<footnote>Hello</footnote>");
    console.log(event.clipboardData);
    event.preventDefault();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaXRhdGlvbi1leHRlbnNpb24vLi9zcmMvY29udGVudC1zY3JpcHQvdHJhdmVyc2UtZG9tLnRzIiwid2VicGFjazovL2NpdGF0aW9uLWV4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaXRhdGlvbi1leHRlbnNpb24vLi9zcmMvY29udGVudC1zY3JpcHQvY29udGVudC1zY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFNBQWdCLFVBQVUsQ0FBRSxhQUEwQixFQUFFLFVBQWtCLEVBQUUsVUFBeUIsRUFBRSxTQUFhO0lBQXhDLDRDQUF5QjtJQUFFLHlDQUFhO0lBQ2hILElBQU0sS0FBSyxHQUFHLHlCQUF5QixDQUFFO0lBRXpDLElBQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxhQUE0QixDQUFDO0lBQzFELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEVBQUU7UUFFMUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFNBQVMsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4RCxJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsc0JBQXFDLENBQUM7UUFDeEUsSUFBSSxXQUFXLElBQUksaUJBQWlCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3JELElBQUksU0FBUyxHQUFXLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDOUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxFQUFFLFNBQVMsR0FBRyxJQUFJLEVBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3pGO1FBRUQsSUFBSSxXQUFXLElBQUksSUFBSSxJQUFJLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUMvRCxJQUFJLE9BQU8sR0FBNEIsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUUsSUFBSSxPQUFPLElBQUksSUFBSTtnQkFBRSxPQUFPO1lBRTVCLElBQUksU0FBUyxHQUFXLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsU0FBUyxHQUFHLElBQUksRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkY7UUFFRCxPQUFPO0tBQ1Y7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhCLElBQU0sU0FBUyxHQUFXLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBRXhELElBQU0sVUFBVSxHQUFXLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekQsSUFBTSxRQUFRLEdBQVcsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQW5DRCxnQ0FtQ0M7QUFFRCw2R0FBNkc7QUFDN0csU0FBUyxpQkFBaUIsQ0FBQyxPQUFvQixFQUFFLE9BQWU7SUFDNUQsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQztBQUN4QyxDQUFDOzs7Ozs7O1VDeENEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQSx1R0FBeUM7QUFFekMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQXFCOztJQUNwRCxJQUFNLFVBQVUsR0FBdUIsY0FBUSxDQUFDLFlBQVksRUFBRSwwQ0FBRSxRQUFRLEVBQUUsQ0FBQztJQUMzRSxJQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBcUIsQ0FBQztJQUNsRCx5QkFBVSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsU0FBbUIsQ0FBQyxDQUFDO0lBRTdELDRFQUE0RTtJQUM1RSxnS0FBZ0s7SUFDL0osS0FBSyxDQUFDLGFBQThCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLDRCQUE0QixDQUFDLENBQUM7SUFDL0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQzNCLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbnRlbnQtc2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlVXAgKHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb3BpZWRUZXh0OiBzdHJpbmcsIHByb3Zpc2lvbnM6IHN0cmluZ1tdID0gW10sIGl0ZXJhdGlvbiA9IDEpIHtcclxuICAgIGNvbnN0IHJlZ2V4ID0gL1xcZCtcXC7igJRcXChcXGQrXFwpfFxcblxcKFxcLitcXCkvIDtcclxuXHJcbiAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXRFbGVtZW50LnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBpZiAoIWFzc2VydEVsZW1lbnRUeXBlKHRhcmdldEVsZW1lbnQsIFwiRElWXCIpKSB7XHJcblxyXG4gICAgICAgIHRyYXZlcnNlVXAocGFyZW50LCBjb3BpZWRUZXh0LCBwcm92aXNpb25zLCBpdGVyYXRpb24rMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByZXZTaWJsaW5nID0gdGFyZ2V0RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmIChwcmV2U2libGluZyAmJiBhc3NlcnRFbGVtZW50VHlwZShwcmV2U2libGluZywgXCJURFwiKSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvdmlzaW9uOiBzdHJpbmcgPSBwcmV2U2libGluZy5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgIHByb3Zpc2lvbnMudW5zaGlmdChwcm92aXNpb24pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YXJnZXRFbGVtZW50LmlubmVyVGV4dCArIFwiXFxuXCIsIHByb3Zpc2lvbiArIFwiXFxuXCIsICBwcmV2U2libGluZy5pbm5lclRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHByZXZTaWJsaW5nID09IG51bGwgJiYgYXNzZXJ0RWxlbWVudFR5cGUodGFyZ2V0RWxlbWVudCwgXCJURFwiKSkge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlczogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGwgPSB0YXJnZXRFbGVtZW50LmlubmVyVGV4dC5tYXRjaChyZWdleCk7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaGVzID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcm92aXNpb246IHN0cmluZyA9IG1hdGNoZXNbMF07XHJcbiAgICAgICAgICAgIHByb3Zpc2lvbnMudW5zaGlmdChwcm92aXNpb24pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInByZXZTaWJsaW5nIGlzIG51bGxcXG5cIiwgcHJvdmlzaW9uICsgXCJcXG5cIiwgdGFyZ2V0RWxlbWVudC5pbm5lclRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfSBcclxuXHJcbiAgICBjb25zb2xlLmxvZyhwcm92aXNpb25zKTtcclxuXHJcbiAgICBjb25zdCBpbm5lclRleHQ6IHN0cmluZyA9IHBhcmVudC5pbm5lclRleHQ7XHJcbiAgICBjb25zb2xlLmxvZyhcIkZPVU5EOiBcIiArIGlubmVyVGV4dC5pbmNsdWRlcyhjb3BpZWRUZXh0KSk7XHJcblxyXG4gICAgY29uc3Qgc3RhcnRJbmRleDogbnVtYmVyID0gaW5uZXJUZXh0LmluZGV4T2YoY29waWVkVGV4dCk7XHJcbiAgICBjb25zdCBlbmRJbmRleDogbnVtYmVyID0gc3RhcnRJbmRleCArIGNvcGllZFRleHQubGVuZ3RoO1xyXG4gICAgY29uc29sZS5sb2coc3RhcnRJbmRleCwgZW5kSW5kZXgpOyAgICAgICAgXHJcbn1cclxuXHJcbi8vIEFuIGVsZW1lbnQgaXMgYSBjb250YWluZXIgaWYgaXQgY29udGFpbnMgdGhlIGVudGlyZSBzZWN0aW9uIG9mIHRoZSBzdGF0dXRlLCBhcyBvcHBvc2VkIHRvIHRoZSBzdWIgc2VjdGlvbiBcclxuZnVuY3Rpb24gYXNzZXJ0RWxlbWVudFR5cGUoZWxlbWVudDogSFRNTEVsZW1lbnQsIG1hdGNoZXI6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIGVsZW1lbnQubm9kZU5hbWUgPT09IG1hdGNoZXI7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCB7dHJhdmVyc2VVcH0gZnJvbSBcIi4vdHJhdmVyc2UtZG9tXCJcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcHknLCAoZXZlbnQ6IENsaXBib2FyZEV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBjb3BpZWRUZXh0OiBzdHJpbmcgfCB1bmRlZmluZWQgPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKT8udG9TdHJpbmcoKTtcclxuICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0cmF2ZXJzZVVwKHRhcmdldEVsZW1lbnQsIHRhcmdldEVsZW1lbnQuaW5uZXJUZXh0IGFzIHN0cmluZyk7XHJcblxyXG4gICAgLy8oZXZlbnQuY2xpcGJvYXJkRGF0YSBhcyBEYXRhVHJhbnNmZXIpLnNldERhdGEoJ3RleHQvcGxhaW4nLCBtb2RpZmllZFRleHQpO1xyXG4gICAgLy8oZXZlbnQuY2xpcGJvYXJkRGF0YSBhcyBEYXRhVHJhbnNmZXIpLnNldERhdGEoJ3RleHQvaHRtbCcsIGNvcGllZFRleHQgKyAnPGI+U291cmNlOjwvYj4gPGEgaHJlZj1cIicgKyBkb2N1bWVudC5sb2NhdGlvbi5ocmVmICsgJ1wiPicgKyBkb2N1bWVudC50aXRsZSArICc8L2E+Jyk7XHJcbiAgICAoZXZlbnQuY2xpcGJvYXJkRGF0YSBhcyBEYXRhVHJhbnNmZXIpLnNldERhdGEoJ2FwcGxpY2F0aW9uL3htbCcsIGA8Zm9vdG5vdGU+SGVsbG88L2Zvb3Rub3RlPmApO1xyXG4gICAgY29uc29sZS5sb2coZXZlbnQuY2xpcGJvYXJkRGF0YSk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG59KTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=