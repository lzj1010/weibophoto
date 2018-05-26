window.onload = weiboPhoto;

function weiboPhoto() {
    console.log(`开始`);
    let page = 1;
    let perInfo = {};
    let photoTotal;
    let a = window.location.href;
    let b = a.split("\/");
    let album_id = parseInt(b[7].toString());
    let number = 0;
    let allAddress = ``;

    function getPerPage() {
        let url = `http://photo.weibo.com/photos/get_all?uid=${b[3]}&album_id=${album_id}&count=30&page=${page}&type=1&__rnd=1527303076868`;
        console.log(url);
        $.ajax({
            type: 'GET',
            url: url,
            timeout: 100000,
        }).done(function(response) {
            photoTotal = response.data.total; //照片总数
            var a = response.data.photo_list.length; //该页照片数
            for (let index = 0; index < a; index++) {
                let temp = [];
                temp[0] = response.data.photo_list[index].created_at; //照片日期
                temp[1] = response.data.photo_list[index].photo_id; //照片ID
                temp[2] = response.data.photo_list[index].caption_render; //照片描述
                temp[3] = response.data.photo_list[index].pic_name;
                perInfo[index * (page - 1) + index] = temp;
                allAddress += `http://wx2.sinaimg.cn/large/${response.data.photo_list[index].pic_name}\n`;
            };
        }).done(function(params) {
            if (photoTotal > 30 && photoTotal / 30 > page) {
                page++;
                getPerPage();
            } else {
                sessionStorage.setItem('allAddress', allAddress);
                console.log(allAddress);
            };
        });
    };
    getPerPage();

    // function downPhoto() {
    //     console.log(perInfo);
    //     if (number < photoTotal) {
    //         let downUrl = `http://wx2.sinaimg.cn/large/${perInfo[number][3]}`;
    //         let img = document.createElement('a');
    //         img.download = `testImg.jpg`;
    //         img.click();
    //         number++;
    //         console.log(number + "||" + downUrl);
    //     };
    // };
};