import React, { useState } from "react";

const Cal = ({ show }) => {
    const [hourlyWage, setHourlyWage] = useState(10000); // 기본 시급 설정
    const [hoursWorked, setHoursWorked] = useState(8); // 기본 일일 근무 시간
    const [weekDays, setWeekDays] = useState(5); // 기본 일주일 근무일수
    const [extraHours, setExtraHours] = useState(0); // 기본 월 연장 근무시간
    const [totalPay, setTotalPay] = useState(0);
    const [calculationDetail, setCalculationDetail] = useState("");

    const calculatePay = () => {
        const weeklyHours = hoursWorked * weekDays;
        const weeklyPay = hourlyWage * weeklyHours;
        const extraPay = hourlyWage * extraHours;
        let vacationPay = 0;

        if (weeklyHours >= 15) {
            vacationPay = 8 * hourlyWage;
        }

        const total = weeklyPay + extraPay + vacationPay;
        setTotalPay(total);

        setCalculationDetail(`총 급여 = (주급: ${weeklyPay} 원) + (연장 수당: ${extraPay} 원) + (주휴수당: ${vacationPay} 원) = ${total} 원`);
    };

    return (
        <section id="Cal" className={show ? "show show-result" : ""}>
            <h1>월급 계산기</h1>
            <div className="input-group">
                <label>
                    시급 (원):
                    <input
                        type="number"
                        value={hourlyWage}
                        onChange={(e) => setHourlyWage(Number(e.target.value))}
                        placeholder="시급을 입력하세요"
                    />
                    <span className="input-icon currency-won-icon"></span>
                </label>
            </div>
            <div className="input-group">
                <label>
                    일일 근무 시간:
                    <input
                        type="number"
                        value={hoursWorked}
                        onChange={(e) => setHoursWorked(Number(e.target.value))}
                        placeholder="일일 근무 시간을 입력하세요"
                    />
                    <span className="input-icon clock-icon"></span>
                </label>
            </div>
            <div className="input-group">
                <label>
                    일주일 근무일수:
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="7"
                            value={weekDays}
                            onChange={(e) => setWeekDays(Number(e.target.value))}
                        />
                        <span>{weekDays}일</span>
                    </div>
                    <span className="input-icon calendar-icon"></span>
                </label>
            </div>
            <div className="input-group">
                <label>
                    월 연장 근무시간:
                    <input
                        type="number"
                        value={extraHours}
                        onChange={(e) => setExtraHours(Number(e.target.value))}
                        placeholder="월 연장 근무시간을 입력하세요"
                    />
                    <span className="input-icon trending-up-icon"></span>
                </label>
            </div>
            <button onClick={calculatePay}>월급 계산하기</button>
            <div className="result">
                <h2>총 급여: {totalPay} 원</h2>
                <p>{calculationDetail}</p>
            </div>
        </section>
    );
};

export default Cal;
