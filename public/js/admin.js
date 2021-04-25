const socket =io();
let connnectionsUsers = [];

socket.on("admin_list_all_users",(connections)=>{
  connnectionsUsers = connections;  
  document.getElementById("list_users").innerHTML="";
  let template = document.getElementById("template").innerHTML;

  connections.forEach(connections => {
       const rendered = Mustache.render(template, {
         email: connections.user.email, 
         id: connections.socket_id
       })

       document.getElementById("list_users").innerHTML +=rendered
    });
});

function call(id){
    const connection = connnectionsUsers.find(connections=> connections.socket_id === id);

    const template = document.getElementById("admin_template").innerHTML;

    const rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.user_id
    })

    document.getElementById("supports").innerHTML += rendered;

    const params={
      user_id: connection.user_id
    }
    socket.emit("admin_list_messages_by_user", params, messages=>{
      const divMessages = document.getElementById(`allMessages${connection.user_id}`);

      messages.forEach(messages=>{
        const createDiv = document.createElement("div");

        if(messages.admin_id ==null)
        {
            createDiv.className = "admin_message_client";
            
            createDiv.innerHTML=`<span>${connection.user.email} - ${messages.text} </span>`;
            createDiv.innerHTML+=`<span class="admin_date">${dayjs(messages.created_at).format("DD/MM/YYYY HH:mm:sss")}`
        }
        else
        {
          createDiv.className = "admin_message_admin";
            
          createDiv.innerHTML=`Atendente: <span> ${messages.text} </span>`;
          createDiv.innerHTML += `<span class="admin_date">${dayjs(messages.created_at).format("DD/MM/YYYY HH:mm:sss")}</span>`; 
        }

        divMessages.appendChild(createDiv);

      })
    })
}

function sendMessage(id){
  const text = document.getElementById(`send_message_${id}`);

  const params = {
    text: text.value,
    user_id: id
  }

  socket.emit("admin_send_message",params);

  const divMessages = document.getElementById(`allMessages${id}`);
  const createDiv = document.createElement("div");
  
  createDiv.className = "admin_message_admin";
  createDiv.innerHTML=`Atendente: <span> ${params.text} </span>`;
  createDiv.innerHTML += `<span class="admin_date">${dayjs().format("DD/MM/YYYY HH:mm:sss")}</span>`; 
  
  divMessages.appendChild(createDiv);

  text.value="";

}