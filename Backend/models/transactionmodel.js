import EmployeeModel from './employeemodel.js';
import PositionModel from './positionmodel.js';
import PresenceModel from './presencemodel.js';

/* Method to fetch Employee Data */

async function getEmployeeData() {
    try {
        const employees = await EmployeeModel.find();
        const employeeMap = new Map();

        employees.forEach(emp => {
            const { nik, employee_name, position } = emp;
            employeeMap.set(employee_name, { nik, position });
        });

        const result = [];
        employeeMap.forEach(({ nik, position }, employee_name) => {
            result.push({ nik, employee_name, position });
        });

        const employeeNames = result.map(emp => emp.employee_name);
        const employeeNIKs = result.map(emp => emp.nik);
        const employeePositions = result.map(emp => emp.position);

        return { employeeNames, employeeNIKs, employeePositions };
    } catch (error) {
        console.error(error);
    }
}

/* Method to fetch Presence Data */

async function getPresenceData() {
    try {
        const presences = await PresenceModel.find();
        const presenceMap = new Map();

        const { employeeNames, employeeNIKs } = await getEmployeeData();

        presences.forEach(presence => {
            const { nik, month, gender, position_name, present, sick, absent } = presence;
            const employee_name = employeeNames.find(name => name === presence.employee_name) || "-";
            const employee_nik = employeeNIKs.find(n => n === presence.nik) || "-";

            presenceMap.set(employee_nik, {
                employee_name,
                month,
                gender,
                position_name,
                present,
                sick,
                absent
            });
        });

        const result = [];
        presenceMap.forEach(({ month, gender, position_name, present, sick, absent, employee_name }, nik) => {
            result.push({
                employee_name,
                nik,
                month,
                gender,
                position_name,
                present,
                sick,
                absent
            });
        });

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

getPresenceData();

/* Method to fetch Position Data */

async function getPositionData() {
    try {
        const positions = await PositionModel.find();
        const positionMap = new Map();

        positions.forEach(pos => {
            const { position_name, base_salary, transport_allowance, meal_allowance } = pos;
            positionMap.set(position_name, { base_salary, transport_allowance, meal_allowance });
        });

        const result = [];
        positionMap.forEach(({ base_salary, transport_allowance, meal_allowance }, position_name) => {
            result.push({ position_name, base_salary, transport_allowance, meal_allowance });
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}
