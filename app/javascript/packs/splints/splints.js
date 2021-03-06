//cookieのkeyに対応するvalueを返し、存在しない場合はnullを返す
//keyが存在しない場合もnullを返す
function get_cookie_value(key) {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var c = cookies[i]
    c = c.replace(/^\s+/, '') //先頭の空白削除
    var c = c.split('=') //実例:[key, value]
    if (c[0] == key) {
      return c[1]
    }
  }
  return null
}
function create_sprint_label(parent, sprint_number) {
  var sprint_label = document.createElement('label');
  sprint_label.innerHTML = `Sprint ${String(sprint_number)}`;
  parent.appendChild(sprint_label);
}
//sprintのkptを一括削除するformの作成
function create_delete_form(parent, sprint_number) {
  var delete_sprint = document.createElement("form");
  delete_sprint.action = "/splints/delete_splint?sp_number=" + String(sprint_number);
  delete_sprint.method = "POST";
  parent.appendChild(delete_sprint);

  var delete_hidden = document.createElement("input");
  delete_hidden.setAttribute("type", "hidden");
  delete_hidden.setAttribute("name", "_method");
  delete_hidden.setAttribute("value", "DELETE");
  delete_sprint.appendChild(delete_hidden);

  var delete_submit = document.createElement("input");
  delete_submit.classList.add('delete-link');
  delete_submit.setAttribute("type", "submit");
  delete_submit.setAttribute("value", "DELETE Sprint");
  delete_sprint.appendChild(delete_submit);
}
// tableのみの作成
function create_table(parent, kpt, sprint, sp_number) {
  var table = document.createElement('table');
  parent.appendChild(table);

  var tr = document.createElement('tr');
  table.appendChild(tr);

  var th = document.createElement('th');
  th.innerHTML = kpt;
  tr.appendChild(th);

  for(let i = 0; i < sprint.length; i++) {
    if (sprint[i].sp_number == sp_number && sprint[i].kpt == kpt) {
      var tr_content = document.createElement('tr');
      table.appendChild(tr_content);

      var td = document.createElement('td');
      tr_content.appendChild(td);

      var a = document.createElement('a');
      a.href = `/splints/${sprint[i].id}`;
      a.classList.add('sprint-a');
      a.innerHTML = sprint[i].content;
      td.appendChild(a);
    }
  }
}
// table,new-linkの作成
function complete_table(table_parent, kpt, sprint, sprint_number) {
  var parent = document.createElement('div');
  parent.classList.add('table-kpt');
  create_table(parent, kpt, sprint, sprint_number);
  create_new_link(parent, kpt, sprint_number);
  table_parent.appendChild(parent);
}
function create_new_link(parent, kpt, sprint_number) {
  var a = document.createElement('a');
  a.href = `/splints/new?kpt=${kpt}&sp_number=${sprint_number}`;
  a.classList.add('new-link');
  a.innerHTML = '+';
  parent.appendChild(a);
}
//スプリントの作成
function create_sprint(sprint, sprint_number) {
  var parent = document.getElementById('sprint-table');
  create_sprint_label(parent, sprint_number);
  create_delete_form(parent, sprint_number);

  var table_parent = document.createElement('div');
  table_parent.classList.add('table-div');
  parent.appendChild(table_parent);

  complete_table(table_parent, 'Keep', sprint, sprint_number)
  complete_table(table_parent, 'Problem', sprint, sprint_number)
  complete_table(table_parent, 'Try', sprint, sprint_number)
}
//現在のスプリントの次の番号のスプリントの作成()
window.create_next_sprint = function create_next_sprint(sprint) {
  // 次に作成するsprintの番号を取得
  var sprint_number = parseInt(get_cookie_value('number')) + 1;
  create_sprint(sprint,sprint_number);
  document.cookie = `number=${sprint_number}`;
}

window.onload = function () {
  //表示しているsprintの数を取得
  var value = get_cookie_value('number');
  if (!value) {
    document.cookie = 'number=0;samesite=lax';
  }
  for (var sp_number = 1; sp_number <= value; sp_number++) {
    create_sprint(sprint, sp_number)
  }
}