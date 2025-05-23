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
			var inserted = false;
			var cdsImages = cdsElement.getElementsByTagName("img");
			for (var i = 0; i < cdsImages.length; i++) {
				if (cdsImages[i].id > firstChild.id) {
					cdsElement.insertBefore(firstChild, cdsImages[i]);
					inserted = true;
					break;
				}
			}
			// 현재 <img>를 cds 아래 원래의 위치에 삽입 (주의: cds의 마지막 자식으로 삽입해야 하는 경우)
			if (!inserted) {
				cdsElement.appendChild(firstChild);
			}
			// 현재 <img>에 대한 onclick 이벤트 핸들러 재설정
			firstChild.onclick = addToTop5;
		} else {
			top5Element.removeChild(firstChild);
		}
	}

	addOnClickHandlers();
}

function moveToOriginalPosition() { // 선택된 이미지를 제자리로 이동시킴
	var imgElement = this; // 선택된 <img> 엘리먼트
	var cds = document.getElementById("cds");
	var top5 = document.getElementById("top5");

	// cds 아래의 <img>들 중 id 값이 imgElement의 id 값보다 크면서 가장 가까운 것을 찾음
	var inserted = false;
	var cdsImages = cds.getElementsByTagName("img");
	for (var i = 0; i < cdsImages.length; i++) {
		if (cdsImages[i].id > imgElement.id) {
			cds.insertBefore(imgElement, cdsImages[i]);
			inserted = true;
			break;
		}
	}
	if (!inserted) {
		cds.appendChild(imgElement);
	}
		
	// imgElement의 순위를 나타내는 <span>을 삭제
	var prevSibling = imgElement.previousSibling;
	if (prevSibling && prevSibling.className === "rank") {
		top5.removeChild(prevSibling);
	}
		
	// imgElement를 cds의 제 위치에 삽입 (주의: cds의 마지막 자식으로 삽입해야 하는 경우)
	// imgElement에 대해 onclick 이벤트 핸들러 재설정
	imgElement.onclick = addToTop5;
		
	// top5 이미지들의 순위 값을 재계산하여 변경
	var ranks = top5.getElementsByClassName("rank");
	for (var i = 0; i < ranks.length; i++) {
		ranks[i].textContent = i + 1;
	}
}
