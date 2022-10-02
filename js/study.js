/**
 * Q1) 배열 돌리기
 * 배열을 원하는 방향 및 각도로 돌릴 수 있도록 solution 함수 작성
 * params:
 * dir: 방향
 * -1: (시계 반대방향), 1: (시계 방향)
 *
 * degree: 각도
 * 0, 90, 180, 270, 360 까지 90도 단위로 들어옴.
 * 0 일 경우 회전 x
 * 360일 경우 한 바퀴
 *
 * matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 * 다른 형태의 matrix가 들어올 수 있으나 회전이 가능한 경우만 취급.
 */

 function solution1(dir, degree, matrix) {
    const answer = [];
    return answer;
  }
  
  /**
   * Q2) 짝이 없는 친구 찾기
   * 짝이 없는 친구를 찾아 문자열로 반환할 수 있도록 solution 함수 작성
   *
   * params:
   * friends: Array<Integer>
   *
   * 본인과 같은 숫자의 사람은 "친구"가 될 수 있다.
   * 단, 같은 숫자는 중복에 상관없이 여러 사람에게 지정될 수 있다.
   * ex) 3, 1, 11, 10, 102, 1, 1, 11, 3의 경우
   * 1번과 3번, 11번은 서로 짝이 되어 총 3그룹이 서로 짝을 찾을 수 있다.
   * 결과적으로 짝이 없는 친구는 10번 102번 1번.
   *
   * 단, 번호에 0 이하의 정수는 취급 X
   */
  
  // function solution2(friends) {
  //   const friendObj = {}
  //   friends.forEach(e => {
  //       if(!friendObj[e]) friendObj[e] = 0
  //       friendObj[e]++
  //   });
    
  //   const answer = Object.entries(friendObj)
  //                   .filter((e) => { if(e[1] % 2 === 1) return e })
  //                   .map((data) => { return data[0]})
  //                   .join(", ")
  //   return answer;
  // }

  // function solution2(friends) {
  //   const couples = {};
  //   friends.forEach((n) => (couples[n] ? couples[n]++ : (couples[n] = 1)));
  //   const notFriends = friends.filter((x) => couples[x] % 2 === 0);
  //   return notFriends.join(" ");
  // }

  // function solution2 (arr) {
  //   let answer = []
  //   arr.sort().forEach(e => {
  //     e === answer[answer.length - 1] ? answer.pop() : answer.push(e);
  //   })
  //   return answer;
  // }

  function solution2 (arr) {
    let map = new Map();
    arr.forEach(e => {
      console.log("현재 값", e)
      map.has(e) ? map.delete(e) : map.set(e,e)
      console.log("map내부 key => value", map)
    });
    return [...map.values()]
  }
  console.log(solution2([3, 1, 11, 10, 102, 1, 1, 11, 3]))