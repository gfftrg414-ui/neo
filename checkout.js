
const products = {
    shop: {
        name: "فروشگاه اینترنتی",
        image: "fr.jpg",
        price: "از ۳ میلیون تومان"
    },
    restaurant: {
        name: "سایت رستوران",
        image: "fc.jpg",
        price: "از ۲ میلیون تومان"
    },
    company: {
        name: "سایت شرکتی",
        image: "sh.jpg",
        price: "از ۲.۵ میلیون تومان"
    },
    gaming: {
        name: "سایت گیمینگ",
        image: "game.jpg",
        price: "از ۲.۸ میلیون تومان"
    },
    personal: {
        name: "سایت شخصی",
        image: "shh.jpg",
        price: "از ۱.۵ میلیون تومان"
    },
    news: {
        name: "سایت خبری",
        image: "hg1.jpg",
        price: "از ۳.۵ میلیون تومان"
    }
};

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = products[productId];

if (product) {
    document.getElementById("productImage").src = product.image;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productPrice").textContent = product.price;
} else {
    document.getElementById("productName").textContent = "محصول پیدا نشد";
    document.getElementById("productImage").style.display = "none";
    document.getElementById("productPrice").textContent = "";
}

document.getElementById("checkoutForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const customerName = document.getElementById("customerName").value.trim();
    const customerPhone = document.getElementById("customerPhone").value.trim();
    const customerNote = document.getElementById("customerNote").value.trim();

    if (!product) {
        alert("محصول موردنظر پیدا نشد.");
        return;
    }

    alert(
        "اطلاعات سفارش شما:\n\n" +
        "محصول: " + product.name + "\n" +
        "قیمت: " + product.price + "\n" +
        "نام: " + customerName + "\n" +
        "شماره تماس: " + customerPhone + "\n" +
        "توضیحات: " + (customerNote || "ندارد") +
        "\n\nاین فرم فعلاً آزمایشی است و سفارش هنوز ارسال نشده است."
    );
});
