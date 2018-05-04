var professors = [
    {
        title: "Aleksandar Kupusinac", //tajtl
        name: "Kupus Brat", //name
        email: "sasak@uns.ac.rs", //email
        home: "Jugodrvo - Kabinet 141", //home
        phone: "021/485-2441", //phone
        link: "http://www.ftn.uns.ac.rs/2048309372/aleksandar-kupusinac", //linkProfe
        picture: "https://i1.rgstatic.net/ii/profile.image/272658193448996-1442018188001_Q512/Aleksandar_Kupusinac.jpg", //slika
        background: "background: url(http://hdwallpaperfx.com/wp-content/uploads/2017/09/Material-Colors-Android-Wallpaper.jpg); background-repeat: no-repeat; background-size: cover; height: 100%; min-height: 100%;",
        biography: "Aleksandar kupusinac je rodjen 1981. godine u Novom Sadu. Trenutno predaje predmete: Objektno orijentisano programiranje, kao i Statistiku. Takodje radi kao profesor razlicith strucnih predmeta u Gimnaziji Jovan Jovanovic Zmaj, gde pomaze mentalno retardiranoj deci."
    },
    {
        title: "Srdjan Popov", //tajtl
        name: "Popov Brat", //name
        email: "srdjanpopov@uns.ac.rs", //email
        home: "Kabinet 9D | Kancelarija 215 215", //home
        phone: "021/485-2417", //phone
        link: "http://www.ftn.uns.ac.rs/n2064252401/srdjan-popov", //linkProfe
        picture: "https://pbs.twimg.com/profile_images/436908892199477248/rATksBUb_400x400.png", //slika
        background: "background: url(https://cdn.flii.by/image/v4y505uo1sr.jpg); background-repeat: no-repeat; background-size: cover; height: 100%; min-height: 100%;",
        biography: "Srdjan Popov je rodjen 24.08.1969. godine u Zrenjaninu. Osnovnu skolu je zavrsio u Zrenjaninu, gde je zavrsio i Srednju skolu za drustvene delatnosti  \"Koca Kolarov\", prirodno-matematicki smer. Vojsku je odsluzio u Rijeci, Hrvatska."
    },
    {
        title: "Jovana Vidakovic", //tajtl
        name: "Vidakovic Sestra", //name
        email: "jovana@uns.ac.rs", //email
        home: "drugi sprat / 51, zgrada DMI&amp;DF", //home
        phone: "021/485-2874", //phone
        link: "http://www.is.pmf.uns.ac.rs/vidakovicj/", //linkProfe
        picture: "http://www.is.pmf.uns.ac.rs/vidakovicj/img/Jovana.jpg", //slika
        background: "background: url(https://i.pinimg.com/originals/5b/1c/49/5b1c492fcd03df52e33d9ca0bfce9dda.jpg); background-repeat: no-repeat; background-size: cover; height: 100%; min-height: 100%;",
        biography: "Jovana Vidakovic je rodjena 6.9.1975. godine u Novom Sadu. Danas ona je udata za Milana Vidakovica i ima dvoje dece(Filipa i Aleksandra). Bila je \"Junior Teaching Assistant\" od 2000-2004. godine, \"Teaching Assistant\" od 2004-2016. godine i danas predaje kao profesor. "
    }
];

function useKupus() {
    function getProf() {
        return professors;
    }
    var list = getProf();

    document.getElementById("tajtl").textContent = list[0].title;
        document.getElementById("name").textContent = list[0].name;
        document.getElementById("email").textContent = list[0].email;
        document.getElementById("home").textContent = list[0].home;
        document.getElementById("phone").textContent = list[0].phone;
        document.getElementById("linkProfe").onclick = function(event) {
            window.location.href = list[0].link;
        }
        document.getElementById("slika").src = list[0].picture;
        document.getElementById("paragraf").innerHTML = list[0].biography;
        document.getElementById("bodi").style.cssText = list[0].background;


        document.getElementById("back btn").onclick = function(event) {
        
            document.getElementById("tajtl").textContent = list[1].title;
            document.getElementById("name").textContent = list[1].name;
            document.getElementById("email").textContent = list[1].email;
            document.getElementById("home").textContent = list[1].home;
            document.getElementById("phone").textContent = list[1].phone;
            document.getElementById("linkProfe").onclick = function(event) {
                window.location.href = list[1].link;
            }
            document.getElementById("slika").src = list[1].picture;
            document.getElementById("paragraf").innerHTML = list[1].biography;
            document.getElementById("bodi").style.cssText = list[1].background;
        }

        document.getElementById("forward btn").onclick = function(event) {
        
            document.getElementById("tajtl").textContent = list[2].title;
            document.getElementById("name").textContent = list[2].name;
            document.getElementById("email").textContent = list[2].email;
            document.getElementById("home").textContent = list[2].home;
            document.getElementById("phone").textContent = list[2].phone;
            document.getElementById("linkProfe").onclick = function(event) {
                window.location.href = list[2].link;
            }
            document.getElementById("slika").src = list[2].picture;
            document.getElementById("paragraf").innerHTML = list[2].biography;
            document.getElementById("bodi").style.cssText = list[2].background;
        }
}


document.getElementById("KLink").onclick = function(event) {
    window.location.href = "Kupus.html";
}
document.getElementById("SLink").onclick = function(event) {
    window.location.href = "Popov.html";
}
document.getElementById("VLink").onclick = function(event) {
    window.location.href = "Vidakovic.html";
}
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}
  