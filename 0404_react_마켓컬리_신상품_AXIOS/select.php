<?
    //1.데이터 베이스 접근권한
    //http://luck1409.dothome.co.kr/signup_db/select.php
    //luck1409.dothome.co.kr/signup_db/select.php ===>접근권한 확인
    
    //CORS

    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Headers: *'); 
    http://luck1409.dothome.co.kr/signup_db/select.php

    $db_server         ='localhost';
    $db_user_name      ='luck1409';
    $db_user_password  ='Ejqmf5767!!';
    $db_name           ='luck1409';

    $conn = mysqli_connect($db_server, $db_user_name , $db_user_password, $db_name);
    mysqli_set_charset($conn,'utf8');

    //데이터 조회 SELECT 필드, 필드1 ... FROM 테이블이름
    //데이터 조회 SELECT *... FROM 테이블이름 (*=>다 가져와)
    //구조적인 질의 언어 
    $sql = "SELECT id, email FROM sign_up";
    $result = mysqli_query($conn, $sql);
   //응답Response조회된 결과 $result  데이터를 
   //배열객체로 변환하고 그리고
   //JSON형태의 데이터로 변환시켜야 
   //JS 가 표준으로 사용할수있다

   //1.배열 객체 선언
   //2.레코드(Record)== 튜플 (Tuple)(1사람 데이터정보 row 줄단위 ) 단위로 데이터를 추출한다.
   //3.반복문은 while문(while(){})을 사용한다
   //4.객체속성을 만들고 배열객체에 데이터를 저장한다.
   //5.JSON으로 변경한다.


   $arr = array();
   while($row = mysqli_fetch_array($result)){
        array_push($arr, array(
            '아이디'=> $row['id'],
            '이메일'=> $row['email']
        ));
   }

   

   //인코딩(JSON 데이터변환)
   //에코를 이용 리턴 응답한다. 이스케이프(ESCAPED)문자 유니코드문자 응답
   //이스케이프(ESCAPED)문자 유니코드문자 문자 사용안함 JSON_UNESCAPED_UNICODE
   echo json_encode($arr, JSON_UNESCAPED_UNICODE); 

?>  
