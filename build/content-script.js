/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./src/content-script/content-script.ts ***!
  \**********************************************/

console.log("content-script");
console.log(document);
document.addEventListener('copy', function (event) {
    var _a;
    var copiedText = (_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.toString();
    var targetElement = event.target;
    console.log(targetElement);
    var modifiedText = copiedText ? copiedText + " HELLO" : "";
    console.log(modifiedText);
    event.clipboardData.setData('text/plain', modifiedText);
    event.clipboardData.setData('text/xml', copiedText + '<b>Source:</b> <a href="' + document.location.href + '">' + document.title + '</a>');
    console.log(event.clipboardData);
    event.preventDefault();
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaXRhdGlvbi1leHRlbnNpb24vLi9zcmMvY29udGVudC1zY3JpcHQvY29udGVudC1zY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRXRCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFxQjs7SUFDcEQsSUFBTSxVQUFVLEdBQXVCLGNBQVEsQ0FBQyxZQUFZLEVBQUUsMENBQUUsUUFBUSxFQUFFLENBQUM7SUFDM0UsSUFBTSxhQUFhLEdBQXVCLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzQixJQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxRQUFRLEVBQUMsQ0FBQyxFQUFFLENBQUM7SUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUV6QixLQUFLLENBQUMsYUFBOEIsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3pFLEtBQUssQ0FBQyxhQUE4QixDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBVSxHQUFHLDBCQUEwQixHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQzdKLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUMzQixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJjb250ZW50LXNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnNvbGUubG9nKFwiY29udGVudC1zY3JpcHRcIik7XHJcbmNvbnNvbGUubG9nKGRvY3VtZW50KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcHknLCAoZXZlbnQ6IENsaXBib2FyZEV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBjb3BpZWRUZXh0OiBzdHJpbmcgfCB1bmRlZmluZWQgPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKT8udG9TdHJpbmcoKTtcclxuICAgIGNvbnN0IHRhcmdldEVsZW1lbnQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGNvbnNvbGUubG9nKHRhcmdldEVsZW1lbnQpO1xyXG4gICAgY29uc3QgbW9kaWZpZWRUZXh0ID0gY29waWVkVGV4dCA/IGNvcGllZFRleHQgKyBcIiBIRUxMT1wiOiBcIlwiO1xyXG4gICAgY29uc29sZS5sb2cobW9kaWZpZWRUZXh0KTtcclxuXHJcbiAgICAoZXZlbnQuY2xpcGJvYXJkRGF0YSBhcyBEYXRhVHJhbnNmZXIpLnNldERhdGEoJ3RleHQvcGxhaW4nLCBtb2RpZmllZFRleHQpO1xyXG4gICAgKGV2ZW50LmNsaXBib2FyZERhdGEgYXMgRGF0YVRyYW5zZmVyKS5zZXREYXRhKCd0ZXh0L3htbCcsIGNvcGllZFRleHQgKyAnPGI+U291cmNlOjwvYj4gPGEgaHJlZj1cIicgKyBkb2N1bWVudC5sb2NhdGlvbi5ocmVmICsgJ1wiPicgKyBkb2N1bWVudC50aXRsZSArICc8L2E+Jyk7XHJcbiAgICBjb25zb2xlLmxvZyhldmVudC5jbGlwYm9hcmREYXRhKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=