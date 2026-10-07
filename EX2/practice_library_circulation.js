const circulationLogs = [
    { logId: 'L001', studentCode: 'SV2024_01', bookIsbn: 'ISBN-9781', status: 'BORROWING', fineAmount: 0, completedDaysAgo: 0 },
    { logId: 'L002', studentCode: 'SV2024_02', bookIsbn: 'ISBN-9782', status: 'RETURNED', fineAmount: 15000, completedDaysAgo: 10 },
    { logId: 'L003', studentCode: 'SV2023_99', bookIsbn: 'ISBN-9783', status: 'LOST', fineAmount: 200000, completedDaysAgo: 35 },
    { logId: 'L004', studentCode: 'SV2024_05', bookIsbn: 'ISBN-9784', status: 'RETURNED', fineAmount: 0, completedDaysAgo: 45 }
];

console.log("--- BẮT ĐẦU CA TRỰC QUẦY LƯU CHUYỂN ---");

circulationLogs.push({
    logId: 'L005',
    studentCode: 'SV2024_10',
    bookIsbn: 'ISBN-9785',
    status: 'BORROWING',
    fineAmount: 0,
    completedDaysAgo: 0
});
console.log("[MƯỢN SÁCH] Sinh viên SV2024_10 vừa mượn cuốn ISBN-9785 (Mã GD: L005).");

const returnLogId = 'L001';
const lateDays = 3; 

for (let i = 0; i < circulationLogs.length; i++) {
    if (circulationLogs[i].logId === returnLogId && circulationLogs[i].status === 'BORROWING') {
        circulationLogs[i].status = 'RETURNED';
        circulationLogs[i].fineAmount = lateDays * 5000; 
        circulationLogs[i].completedDaysAgo = 0;
        console.log(`[TRẢ SÁCH] Giao dịch ${returnLogId} hoàn tất. Trễ ${lateDays} ngày. Phạt: ${circulationLogs[i].fineAmount} VNĐ.`);
        break;
    }
}

for (let i = 0; i < circulationLogs.length; i++) {
    if (circulationLogs[i].logId === 'L005') {
        circulationLogs[i].status = 'LOST';
        circulationLogs[i].fineAmount = 200000; 
        circulationLogs[i].completedDaysAgo = 0;
        console.log(`[BÁO MẤT] Giao dịch L005 báo mất sách. Phạt: 200.000 VNĐ.`);
        break;
    }
}

let deletedCount = 0;
for (let i = circulationLogs.length - 1; i >= 0; i--) {
    const log = circulationLogs[i];
    if (log.status !== 'BORROWING' && log.completedDaysAgo > 30) {
        circulationLogs.splice(i, 1);
        deletedCount++;
    }
}
console.log(`[DỌN DẸP] Đã xóa ${deletedCount} bản ghi quá 30 ngày để tối ưu bộ nhớ.`);

let currentBorrowingCount = 0;
let totalFineCollected = 0;

for (let i = 0; i < circulationLogs.length; i++) {
    if (circulationLogs[i].status === 'BORROWING') {
        currentBorrowingCount++;
    }
    totalFineCollected += circulationLogs[i].fineAmount;
}

console.log("\n==========================================================");
console.log("            BÁO CÁO TỔNG KẾT LƯU CHUYỂN CUỐI NGÀY         ");
console.log("==========================================================");
console.table(circulationLogs);
console.log("----------------------------------------------------------");
console.log(`> Tổng số sách ĐANG ĐƯỢC MƯỢN (BORROWING): ${currentBorrowingCount} cuốn`);
console.log(`> Tổng doanh thu phí phạt thu được:       ${totalFineCollected.toLocaleString('vi-VN')} VNĐ`);
console.log("==========================================================\n");
