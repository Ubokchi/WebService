package mondial;

import javax.xml.parsers.*;

import org.w3c.dom.*;

import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;

import java.io.*;

public class ProcessCountries1 {
	static final String inputFile = "mondial/mondial-sample.xml";  // 나중에 "mondial/mondial.xml"로 변경해서 테스트 
	static final String outputFile = "mondial/result.xml";
	
	public static void main(String[] args) {
		// DOM parser 생성 및 XML 문서 parsing
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setIgnoringElementContentWhitespace(true);
		Document document = null;
		try {
			DocumentBuilder builder = factory.newDocumentBuilder();
			document = builder.parse(inputFile);
		} catch (Exception e) {
			e.printStackTrace();
		}

		Element mondial = document.getDocumentElement();
		
		// 국가별 정보 검색 (문제 1번)
		retrieveCountryInfo(mondial);	
		
		// 국가별 정보 요약(DOM 트리 수정) (문제 2번)
		summarizeCountryInfo(mondial);	
	}

	public static void retrieveCountryInfo(Element mondial) {


	} 
	
	public static void summarizeCountryInfo(Element mondial) {
				
		
		// 변경된 DOM Tree를 XML file로 저장
		saveDOMTreeToFile(mondial.getOwnerDocument());		
	} 
	
	public static void saveDOMTreeToFile(Document document) {
		// 처리 결과 출력을 위한 변환기 생성
		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer transformer = null;
		try {
			transformer = tf.newTransformer();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		// 출력 포맷 설정: XML 선언과 문서 유형 선언 생성
		transformer.setOutputProperty(OutputKeys.ENCODING, "utf-8");
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");
		
		// DOMSource 객체 생성
		DOMSource source = new DOMSource(document);
		// StreamResult 객체 생성
		StreamResult result = new StreamResult(new File(outputFile));

		try {
			// 파일로 저장
			transformer.transform(source, result);
		} catch (TransformerException e) {
			e.printStackTrace();
		}		
		System.out.println();
		System.out.println(outputFile + "로 저장되었습니다.");
	} 
}