
const products = {
    shop: {
        name: "فروشگاه اینترنتی",
        image: "fr.jpg",
        price: "از ۳ میلیون تومان",
        description: "مناسب فروش لباس، کفش، لوازم دیجیتال و محصولات متنوع. شامل معرفی محصولات و صفحه اختصاصی هر محصول."
    },

    restaurant: {
        name: "سایت رستوران",
        image: "fc.jpg",
        price: "از ۲ میلیون تومان",
        description: "مناسب رستوران و فست‌فود؛ برای نمایش منو، قیمت غذاها، تصاویر و اطلاعات تماس."
    },

    company: {
        name: "سایت شرکتی",
        image: "sh.jpg",
        price: "از ۲.۵ میلیون تومان",
        description: "برای معرفی شرکت، خدمات، تیم، سوابق کاری و راه‌های ارتباطی."
    },

    gaming: {
        name: "سایت گیمینگ",
        image: "game.jpg",
        price: "از ۲.۸ میلیون تومان",
        description: "مناسب معرفی بازی‌ها، اخبار گیمینگ و محصولات مرتبط با دنیای بازی."
    },

    personal: {
        name: "سایت شخصی",
        image: "shh.jpg",
        price: "از ۱.۵ میلیون تومان",
        description: "برای معرفی مهارت‌ها، پروژه‌ها، رزومه و نمونه‌کارهای شخصی."
    },

    news: {
        name: "سایت خبری",
        image: "hg1.jpg",
        price: "از ۳.۵ میلیون تومان",
        description: "برای انتشار اخبار، مقاله‌ها، مطالب آموزشی و دسته‌بندی محتوا."
    }
};

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = products[productId];

if (product) {
    document.getElementById("productImage").src = product.image;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productPrice").textContent = product.price;
    document.getElementById("productDescription").textContent = product.description;

    document.getElementById("checkoutLink").href =
        "checkout.html?id=" + productId;

} else {
    document.getElementById("productName").textContent = "سایت موردنظر پیدا نشد";

    document.getElementById("productDescription").textContent =
        "لطفاً از صفحه اصلی یکی از سایت‌ها را انتخاب کنید.";

    document.getElementById("productImage").style.display = "none";
    document.getElementById("productPrice").style.display = "none";
}
