<?
    //1.데이터 베이스 접근권한
    //http://luck1409.dothome.co.kr/signup_db/insert.php 
    //luck1409.dothome.co.kr/signup_db/insert.php ===>접근권한 확인
  

    $db_server         ='localhost';
    $db_user_name      ='luck1409';
    $db_user_password  ='Ejqmf5767!!';
    $db_name           ='luck1409';

    $conn = mysqli_connect($db_server, $db_user_name , $db_user_password, $db_name);
    mysqli_set_charset($conn,'utf8');

    // if (!$conn){
    //     die('데이터베이스 접속실패');
    // }
    // else{
    //     echo('데이터베이스 접속성공');
    // }

// 필드명 (field== item == attribute= column) 
// id, pw, name, emain, hp ,address ,gender ,birth ,service ,chooga ,sign_up_date
        //데이터 베이스에 회원정보 저장하기
        //$변수 = "INSERT INTO 테이블이름 (field1,field2 ... )VALUES('field1값','field2값'...')";
        
    $sql = "INSERT INTO sign_up(id, pw, name, email, hp ,address ,gender ,birth ,service ,chooga ,sign_up_date) 
            VALUES
            ('luck1409', 'dkssud1', '서효빈 ', 'luck1gh409@hanmail.net', '010-3548-5954' ,'서울마포구마포대로4나길' ,'여자' ,'19930530 ' ,'이용약관 동의필수,개인정보 수집∙이용 동의필수,본인은 만 14세 이상입니다.본인은 만 14세 이상입니다.' ,'마켓컬리 일일세일' ,'2023-03-16'),
            ('cvcvbcv', 'dfgsfdg', '안넝 ', 'luck1409@hanil.net', '010-3548-4145' ,'서울마포구마포대로4나fg길' ,'남자' ,'19930522330 ' ,'이용약관 동의필수,개인정보 수집∙이용 동의필수,본인은 만 14세 이상입니다.본인은 만 14세 이상입니다.' ,'마켓컬리 일일세일' ,'2023-03-15')";

            
    $result =  mysqli_query($conn,$sql); //쿼리 실행 

    if(!$result){
        echo("데이터 베이스 테이블에 회원정보 저장 실패");
    }
    else{
        echo("성공!!!!");
    }
?>  
