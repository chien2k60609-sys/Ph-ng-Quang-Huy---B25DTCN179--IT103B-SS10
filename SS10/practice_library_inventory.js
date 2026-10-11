let bookCatalog = [
    { bookCode: "B01", title: "Lập trình JS", price: 150000, totalCopies: 10, availableCopies: 2 },
    { bookCode: "B02", title: "Thiết kế hệ thống", price: 220000, totalCopies: 5, availableCopies: 1 },
    { bookCode: "B03", title: "Cơ sở dữ liệu", price: 180000, totalCopies: 8, availableCopies: 0 }
];

function addBook(newBook) {
    bookCatalog.push(newBook);
}

function borrowBook(bookCode) {
    for (let i = 0; i < bookCatalog.length; i++) {
        if (bookCatalog[i].bookCode === bookCode) {
            if (bookCatalog[i].availableCopies > 0) {
                bookCatalog[i].availableCopies -= 1;
                if (bookCatalog[i].availableCopies === 0) {
                    console.log("Mã " + bookCode + ": HẾT SÁCH TRÊN KỆ");
                }
            } else {
                console.log("Không thể mượn, mã " + bookCode + " đã HẾT SÁCH TRÊN KỆ!");
            }
        }
    }
}

function liquidateBook(bookCode) {
    for (let i = 0; i < bookCatalog.length; i++) {
        if (bookCatalog[i].bookCode === bookCode) {
            bookCatalog.splice(i, 1);
        }
    }
}

function printInventoryReport() {
    let totalCopiesSum = 0;
    let totalAssetValue = 0;

    for (let i = 0; i < bookCatalog.length; i++) {
        totalCopiesSum += bookCatalog[i].totalCopies;
        totalAssetValue += bookCatalog[i].totalCopies * bookCatalog[i].price;
    }

    console.log("--- BẢNG KIỂM KÊ KHO SÁCH ---");
    console.table(bookCatalog);
    console.log("Tổng số bản sách: " + totalCopiesSum);
    console.log("Tổng giá trị kho: " + totalAssetValue + " VNĐ");
}

console.log("=== BẮT ĐẦU ===");

printInventoryReport();

borrowBook("B01");
borrowBook("B01");
borrowBook("B01");

addBook({ bookCode: "B04", title: "Giải thuật", price: 135000, totalCopies: 12, availableCopies: 12 });

liquidateBook("B02");

printInventoryReport();
