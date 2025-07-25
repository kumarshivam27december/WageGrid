import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// To use __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Extended mapping dictionary
const mapping = {
  // Common general terms
  "pegawai": "employee",
  "jabatan": "job",
  "gaji": "salary",
  "laporan": "report",
  "kehadiran": "attendance",
  "potongan": "deduction",
  "absensi": "attendance",
  "ubahPassword": "changePassword",
  "slipGaji": "salarySlip",

  // Function/variable names
  "dataPegawai": "employeeData",
  "getDataPegawai": "getEmployeeData",
  "getDataPegawaiByID": "getEmployeeDataByID",
  "getDataPegawaiByNik": "getEmployeeDataByNIK",
  "getDataPegawaiByName": "getEmployeeDataByName",
  "createDataPegawai": "createEmployeeData",
  "updateDataPegawai": "updateEmployeeData",
  "deleteDataPegawai": "deleteEmployeeData",

  "dataJabatan": "jobData",
  "getDataJabatan": "getJobData",
  "getDataJabatanByID": "getJobDataByID",
  "createDataJabatan": "createJobData",
  "updateDataJabatan": "updateJobData",
  "deleteDataJabatan": "deleteJobData",

  "dataKehadiran": "attendanceData",
  "viewDataKehadiran": "viewAttendanceData",
  "viewDataKehadiranByID": "viewAttendanceDataByID",
  "createDataKehadiran": "createAttendanceData",
  "updateDataKehadiran": "updateAttendanceData",
  "deleteDataKehadiran": "deleteAttendanceData",

  "dataPotongan": "deductionData",
  "viewDataPotongan": "viewDeductionData",
  "viewDataPotonganByID": "viewDeductionDataByID",
  "createDataPotonganGaji": "createSalaryDeductionData",
  "updateDataPotongan": "updateDeductionData",
  "deleteDataPotongan": "deleteDeductionData",

  "dataGajiPegawai": "employeeSalaryData",
  "getDataGajiPegawai": "getEmployeeSalaryData",
  "viewDataGajiPegawai": "viewEmployeeSalaryData",
  "viewDataGajiPegawaiByMonth": "viewEmployeeSalaryDataByMonth",
  "viewDataGajiPegawaiByYear": "viewEmployeeSalaryDataByYear",

  "viewDataGajiSinglePegawaiByMonth": "viewEmployeeSalaryByMonth",
  "viewDataGajiSinglePegawaiByYear": "viewEmployeeSalaryByYear",

  "dashboardPegawai": "employeeDashboard",

  // Schema field renames
  "nama_pegawai": "employee_name",
  "jenis_kelamin": "gender",
  "tanggal_masuk": "join_date",
  "hak_akses": "role",
  "id_pegawai": "employee_id",
  "bulan": "month",
  "tahun": "year",
  "uang_makan": "meal_allowance",
  "tj_transport": "transport_allowance",
  "gaji_pokok": "base_salary",
  "total_gaji": "total_salary"
};

// Directories to scan and update
const targetDirs = ['controllers', 'middleware', 'routes', 'config', 'models'];

function processFile(filePath) {
  let content = readFileSync(filePath, 'utf8');
  let updated = content;

  for (const [oldWord, newWord] of Object.entries(mapping)) {
    const regex = new RegExp(`\\b${oldWord}\\b`, 'g');
    updated = updated.replace(regex, newWord);
  }

  if (updated !== content) {
    writeFileSync(filePath, updated);
    console.log(`✅ Updated: ${filePath}`);
  }
}

function traverseDirectory(dirPath) {
  const files = readdirSync(dirPath);
  for (const file of files) {
    const fullPath = join(dirPath, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      traverseDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

// Run the script
for (const dir of targetDirs) {
  traverseDirectory(join(__dirname, dir));
}
