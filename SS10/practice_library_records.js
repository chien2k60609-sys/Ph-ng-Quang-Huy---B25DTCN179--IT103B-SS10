let borrowRecords = [
    { recordId: "PM01", studentId: "SV101", bookTitle: "Lập trình C cơ bản", borrowDays: 10, isReturned: false },
    { recordId: "PM02", studentId: "SV102", bookTitle: "Cấu trúc dữ liệu và giải thuật", borrowDays: 20, isReturned: false },
    { recordId: "PM03", studentId: "SV103", bookTitle: "Cơ sở dữ liệu MySQL", borrowDays: 15, isReturned: true }
];

console.log("=== DANH SÁCH BAN ĐẦU ===");
console.table(borrowRecords);

let newRecord = { recordId: "PM04", studentId: "SV104", bookTitle: "Clean Code", borrowDays: 18, isReturned: false };
borrowRecords.push(newRecord);

console.log("\n=== 1. ĐÃ THÊM PHIẾU MỚI (PM04) ===");
console.log("Đã thêm thành công phiếu mượn PM04 của sinh viên SV104.");

console.log("\n=== 2. KẾT QUẢ RÀ SOÁT PHẠT QUÁ HẠN (> 14 NGÀY) ===");
let totalFine = 0;

for (let i = 0; i < borrowRecords.length; i++) {
    let record = borrowRecords[i];
    if (record.borrowDays > 14) {
        let overdueDays = record.borrowDays - 14;
        let fine = overdueDays * 5000;
        totalFine += fine;
        console.log(`- Phiếu ${record.recordId} (${record.studentId} - ${record.bookTitle}): Mượn ${record.borrowDays} ngày, quá hạn ${overdueDays} ngày -> Phạt: ${fine.toLocaleString("vi-VN")} VNĐ`);
    }
}
console.log(`=> TỔNG TIỀN PHẠT PHÁT SINH: ${totalFine.toLocaleString("vi-VN")} VNĐ`);

console.log("\n=== 3. CẬP NHẬT TRẢ SÁCH CHO PHIẾU PM01 ===");
for (let i = 0; i < borrowRecords.length; i++) {
    if (borrowRecords[i].recordId === "PM01") {
        borrowRecords[i].isReturned = true;
        console.log("Đã cập nhật trạng thái isReturned = true cho phiếu PM01.");
        break;
    }
}

console.log("\n=== 4. XÓA PHIẾU MƯỢN PM03 KHỎI HỆ THỐNG ===");
for (let i = 0; i < borrowRecords.length; i++) {
    if (borrowRecords[i].recordId === "PM03") {
        borrowRecords.splice(i, 1);
        console.log("Đã xóa thành công phiếu PM03 khỏi danh sách.");
        break;
    }
}

console.log("\n=========================================================================================");
console.log("                          BẢNG TỔNG KẾT PHIẾU MƯỢN THƯ VIỆN                              ");
console.log("=========================================================================================");

let summaryTable = [];
for (let i = 0; i < borrowRecords.length; i++) {
    let r = borrowRecords[i];
    let overdueDays = r.borrowDays > 14 ? r.borrowDays - 14 : 0;
    let fine = overdueDays * 5000;

    summaryTable.push({
        "Mã phiếu": r.recordId,
        "Mã sinh viên": r.studentId,
        "Tên sách": r.bookTitle,
        "Số ngày mượn": r.borrowDays,
        "Trạng thái": r.isReturned ? "Đã trả" : "Đang mượn",
        "Tiền phạt (VNĐ)": fine.toLocaleString("vi-VN")
    });
}

console.table(summaryTable);
console.log("=========================================================================================\n");
