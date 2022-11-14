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

function solution2(arr) {
  let map = new Map();
  arr.forEach((e) => {
    console.log('현재 값', e);
    map.has(e) ? map.delete(e) : map.set(e, e);
    console.log('map내부 key => value', map);
  });
  return [...map.values()];
}
console.log(solution2([3, 1, 11, 10, 102, 1, 1, 11, 3]));

/**
 * Q3) 대포와 대공포
 * 어느날 랫서판다 마을에 흑곰마을에서 쏜 대포가 날라왔습니다. 위기를 느낀 랫서판다들은 서둘러 대공포를 만들었습니다.
 * 대포는 (, {, [ 의 3가지 형태로 발사됩니다.
 * 이를 막을 수 있는 대공포는 ), }, ] 의 3가지 형태로 대포의 형태에 맞게 제작되었습니다.
 * ()와 같이 짝이 맞는 대포와 대공포는 방어에 성공합니다.
 * (}와 같이 짝이 맞지 않는 대포와 대공포는 방어에 실패합니다.
 * ()}와 같이 대공포를 더 많이 소비한 경우에도 방어에 실패한 것으로 간주합니다.
 * 흑곰마을의 공격은 ({attack([abc]))}) 와 같이 대포와 공포탄을 섞어서 문자열로 공격합니다.
 * 랫서판다 마을이 공격에 방어했다면 '방어성공'
 * 실패했다면 '방어실패', 공격허용 '('
 * 대공포를 더 많이 소비했다면 '방어실패', 과소비 ')' 와 같이 표시합니다.
 */
function solution3(attack) {
  return defense;
}

console.log(solution3('({attack([abc]))})'));

/**
 * Q4) 계단을 올라봅시다.
 * 총 n개의 계단이 어떤 사람의 눈앞에 있습니다.
 * 사람은 한번에 1개의 계단을 오를 때도, 한번에 2개의 계단을 오를 때도 있습니다.
 * n개의 계단을 오르기위한 경우의 수를 출력하는 함수를 만들어봅시다.
 * 예를 들어 3개의 계단이라면, [1, 1, 1], [1, 2], [2, 1]과 같이 3가지 경우의 수가 나옵니다.
 */

function solution4(stairs) {
  return up;
}

console.log(solution4(3));
