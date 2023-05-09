let section_industry = document.querySelector("#discussBox_industry");

loadData();
function loadData() {
  let myList = localStorage.getItem("list");
  if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach((item) => {
      // create a article
      let article = document.createElement("section");
      article.classList.add("article");
      let author_information = document.createElement("section");
      author_information.classList.add("author_information");
      author_information.innerHTML = '<i class="fa-solid fa-user"></i>';

      let author = document.createElement("p");
      author.classList.add("post-author");
      author.innerText = item.authorName;

      let time = document.createElement("p");
      time.classList.add("post-time");
      time.innerText = item.Y + " / " + item.M + " / " + item.D;

      let ctitle = document.createElement("h5");
      ctitle.classList.add("post-class");
      if (item.PostClass == "agriculture") {
        ctitle.innerText = "農業";
      } else if (item.PostClass == "industry") {
        ctitle.innerText = "工業";
      } else if (item.PostClass == "economy") {
        ctitle.innerText = "經濟";
      }

      author_information.appendChild(author);
      author_information.appendChild(time);
      author_information.appendChild(ctitle);

      let title = document.createElement("h2");
      title.classList.add("post-title");
      title.innerText = item.Title;

      article.appendChild(author_information);
      article.appendChild(title);

      let content = document.createElement("p"); //顯示的內文
      content.classList.add("post-content");
      content.innerText = item.Content;

      let overContent = document.createElement("p"); //隱藏多的內文
      overContent.classList.add("post-content");
      overContent.classList.add("hide");

      let open = document.createElement("a");
      open.classList.add("content_a");
      open.innerText = " ";
      open.onclick = hide;

      function hide() {
        overContent.classList.toggle("hide");
        open.classList.toggle("hide-a");
      }

      content_text = item.Content;
      let t1 = 150;
      if (content_text.length > t1) {
        //let ooText = content_text;
        content.innerText = content_text.substring(0, t1);
        overContent.innerText = content_text.substring(t1, content_text.length);
        content.appendChild(overContent);
        content.appendChild(open);

        article.appendChild(content);
      } else {
        content.innerText = content_text;
        article.appendChild(content);
      }

      let trashButton = document.createElement("button");
      trashButton.classList.add("trash");
      trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

      trashButton.addEventListener("click", (e) => {
        let articleItem = e.target.parentElement;
        //console.log("articleItem=", articleItem);

        articleItem.addEventListener("animationend", () => {
          // remove from local storage
          let text = articleItem.children[1].innerText;
          //console.log("text=", text);

          let myListArray = JSON.parse(localStorage.getItem("list"));
          myListArray.forEach((item, index) => {
            //console.log(item.Title);
            if (item.Title == text) {
              myListArray.splice(index, 1);
              localStorage.setItem("list", JSON.stringify(myListArray));
            }
          });

          articleItem.remove();
        });

        articleItem.style.animation = "scaleDown 0.3s forwards";
      });

      article.appendChild(trashButton);

      if (item.PostClass == "industry") {
        section_industry.appendChild(article);
      }
    });
  }
}
