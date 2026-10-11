let circulationLogs = [
    { logId: "LOG01", studentCode: "SV01", bookIsbn: "B01", status: "BORROWING", fineAmount: 0, daysOverdue: 0, createdDate: "2026-09-01" },
    { logId: "LOG02", studentCode: "SV02", bookIsbn: "B02", status: "BORROWING", fineAmount: 0, daysOverdue: 0, createdDate: "2026-08-10" },
    { logId: "LOG03", studentCode: "SV03", bookIsbn: "B03", status: "RETURNED", fineAmount: 15000, daysOverdue: 3, createdDate: "2026-08-01" }
];

function borrowBook(studentCode, bookIsbn) {
    let newLog = {
        logId: "LOG" + String(circulationLogs.length + 1).padStart(2, "0"),
        studentCode: studentCode,
        bookIsbn: bookIsbn,
        status: "BORROWING",
        fineAmount: 0,
        daysOverdue: 0,
        createdDate: new Date().toISOString().split("T")[0]
    };
    circulationLogs.push(newLog);
    console.log(`[MƯỢN SÁCH] Sinh viên ${studentCode} mượn thành công cuốn sách ISBN: ${bookIsbn}`);
}

function renewBook(logId, extraDays = 7) {
    let log = circulationLogs.find(item => item.logId === logId);
    if (!log) {
        console.log(`[LỖI GIA HẠN] Không tìm thấy mã giao dịch ${logId}`);
        return;
    }
    if (log.status !== "BORROWING") {
        console.log(`[LỖI GIA HẠN] Giao dịch ${logId} không ở trạng thái đang mượn.`);
        return;
    }
    console.log(`[GIA HẠN] Giao dịch ${logId} của SV ${log.studentCode} đã được gia hạn thêm ${extraDays} ngày.`);
}

function returnBook(logId, isLost = false, daysOverdue = 0) {
    let log = circulationLogs.find(item => item.logId === logId);
    if (!log) {
        console.log(`[LỖI TRẢ SÁCH] Không tìm thấy mã giao dịch ${logId}`);
        return;
    }

    if (isLost) {
        log.status = "LOST";
        log.fineAmount = 200000;
        console.log(`[BÁO MẤT] Mã ${logId}: Làm mất sách. Phạt cố định 200.000 VNĐ.`);
    } else {
        log.status = "RETURNED";
        log.daysOverdue = daysOverdue;
        if (daysOverdue > 0) {
            log.fineAmount = daysOverdue * 5000;
            console.log(`[TRẢ SÁCH QUÁ HẠN] Mã ${logId}: Trễ ${daysOverdue} ngày. Phạt: ${log.fineAmount.toLocaleString("vi-VN")} VNĐ.`);
        } else {
            log.fineAmount = 0;
            console.log(`[TRẢ SÁCH] Mã ${logId}: Trả đúng hạn. Không bị phạt.`);
        }
    }
}

function deleteOldCompletedLogs(daysLimit = 30) {
    let today = new Date();
    let initialCount = circulationLogs.length;

    circulationLogs = circulationLogs.filter(log => {
        if (log.status === "BORROWING") return true;

        let logDate = new Date(log.createdDate);
        let diffDays = Math.floor((today - logDate) / (1000 * 60 * 60 * 24));

        return diffDays <= daysLimit;
    });

    let removedCount = initialCount - circulationLogs.length;
    console.log(`[DỌN DẸP BO NHO] Đã xóa ${removedCount} bản ghi hoàn tất quá ${daysLimit} ngày.`);
}

function printDailyReport() {
    let borrowingLogs = circulationLogs.filter(log => log.status === "BORROWING");
    let totalFine = circulationLogs.reduce((sum, log) => sum + log.fineAmount, 0);

    console.log("\n=========================================================================================");
    console.log("                           BÁO CÁO LƯU CHUYỂN SÁCH VÀ TÀI CHÍNH CUỐI NGÀY                 ");
    console.log("=========================================================================================");

    let displayData = circulationLogs.map(log => ({
        "Mã GD": log.logId,
        "Mã SV": log.studentCode,
        "Mã ISBN": log.bookIsbn,
        "Trạng thái": log.status,
        "Trễ (Ngày)": log.daysOverdue,
        "Tiền phạt (VNĐ)": log.fineAmount.toLocaleString("vi-VN"),
        "Ngày tạo": log.createdDate
    }));

    console.table(displayData);

    console.log("-----------------------------------------------------------------------------------------");
    console.log(` SỐ SÁCH ĐANG ĐƯỢC MƯỢN : ${borrowingLogs.length} cuốn`);
    console.log(` TỔNG TIỀN PHẠT THU ĐƯỢC: ${totalFine.toLocaleString("vi-VN")} VNĐ`);
    console.log("=========================================================================================\n");
}

console.log(">>> MÔ PHỎNG MỘT NGÀY VẬN HÀNH TẠI QUẦY THỦ THƯ <<<\n");

borrowBook("SV04", "B04");

renewBook("LOG01", 7);

returnBook("LOG01", false, 4);

returnBook("LOG02", true, 0);

deleteOldCompletedLogs(30);

printDailyReport();