function addOnClickHandlers() {
	var cdsDiv = document.getElementById("cds");
	var cdImages = cdsDiv.getElementsByTagName("img");
	for (var i = 0; i < cdImages.length; i++) {
		cdImages[i].onclick = addToTop5;
	}
}

function addToTop5() {
	var imgElement = this;
	var top5Element = document.getElementById("top5");
	var numCDs = 0;

	for (var i = 0; i < top5Element.childNodes.length; i++) {
		if (top5Element.childNodes[i].nodeName.toLowerCase() == "img") {
			numCDs = numCDs + 1;
		}
	}
	if (numCDs >= 5) {
		alert("You already have 5 CDs. Click \"Start Over\" to try again.");
		return;
	}

	top5Element.appendChild(imgElement);
	imgElement.onclick = null;
	// imgElement.onclick = moveToOriginalPosition; // 선택된 이미지를 제자리로 이동시킴

	var newSpanElement = document.createElement("span");
	newSpanElement.className = "rank";
	var newTextElement = document.createTextNode(numCDs + 1);
	newSpanElement.appendChild(newTextElement);
	top5Element.insertBefore(newSpanElement, imgElement);
}

function startOver() {
	var top5Element = document.getElementById("top5");
	var cdsElement = document.getElementById("cds");
	while (top5Element.hasChildNodes()) {
		var firstChild = top5Element.firstChild;
		if (firstChild.nodeName.toLowerCase() == "img") {
			cdsElement.appendChild(firstChild);

			// cds 아래의 <img> 엘리먼트들 중 id 값이 현재 <img>의 id 값보다 크면서 가장 가까운 것을 찾음

			// 현재 <img>를 cds 아래 원래의 위치에 삽입 (주의: cds의 마지막 자식으로 삽입해야 하는 경우)

			// 현재 <img>에 대한 onclick 이벤트 핸들러 재설정
		} else {
			top5Element.removeChild(firstChild);
		}
	}

	addOnClickHandlers();
}

function moveToOriginalPosition() { // 선택된 이미지를 제자리로 이동시킴
	var imgElement = this; // 선택된 <img> 엘리먼트
	var cds = document.getElementById("cds");

	// cds 아래의 <img>들 중 id 값이 imgElement의 id 값보다 크면서 가장 가까운 것을 찾음

	// imgElement의 순위를 나타내는 <span>을 삭제

	// imgElement를 cds의 제 위치에 삽입 (주의: cds의 마지막 자식으로 삽입해야 하는 경우)

	// imgElement에 대해 onclick 이벤트 핸들러 재설정

	// top5 이미지들의 순위 값을 재계산하여 변경

}
