package mondial;

import java.util.HashMap;
import java.util.Map;

import javax.xml.parsers.*;

import org.w3c.dom.*;

public class ProcessCountries2 {
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
		
		// 종교별 신자 수를 계산 및 출력 (문제 3번)
		computeBelieversOfReligions(mondial);		
		
		// 대륙별 인구를 계산 및 출력 (선택 문제)
		computePopulationsOfContinents(mondial);					
	}
	
	public static void computeBelieversOfReligions(Element mondial) {
		// 각 종교의 이름과 신자 수를 저장할 Map 생성
	    Map<String, Long> religions = new HashMap<String, Long>();

	}

	 
	public static void computePopulationsOfContinents(Node mondial) {
		// 대륙별 인구 계산 및 출력을 위해 대륙 이름들을 저장한 배열 정의
    	final String continent[] = new String[] { "Africa", "America", "Asia", "Australia", "Europe" };
    	// 각 대륙의 인구 값을 저장할 배열 선언(대륙의 순서는 위 배열과 동일)
 		long pop[] = new long[5];  
    	
 		
	}
}