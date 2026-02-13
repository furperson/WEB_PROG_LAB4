import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoints, addPoint, clearPoints, logout } from '../store/slices';
import Graph from './Graph';

const MainPage = () => {
    const dispatch = useDispatch();
    const { points, totalPages, currentPage } = useSelector(state => state.points);
    const [form, setForm] = useState({ x: 0, y: 0, r: 1 });
    const [errors, setErrors] = useState("");

    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchPoints(0));
    }, [dispatch]);

    const handleSubmit = () => {
        if (form.y < -5 || form.y > 3 || isNaN(form.y)) {
            setErrors("Y должен быть от -5 до 3");
            return;
        }
        dispatch(addPoint({ ...form, type: 'FORM' }));
    };

    const handleGraphClick = (x, y) => {
        dispatch(addPoint({ x, y, r: form.r, type: 'GRAPH' }));
    };

    return (
        <div>
            <div className="header">

                <h3>Сыщиков Никита Сергеевич, P3231 , Вариант 4409</h3>
                <p>пользователь : <b>{user?.username}</b></p>
                <button onClick={() => dispatch(logout())}>Выйти</button>
            </div>

            <div className="main-container">
                <div className="control-panel">
                    <Graph points={points} r={form.r} onGraphClick={handleGraphClick} />

                    <div className="form">
                        <label>X:
                            <select value={form.x} onChange={e => setForm({...form, x: Number(e.target.value)})}>
                                {[-4,-3,-2,-1,0,1,2,3,4].map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </label>
                        <br/>
                        <label>Y:
                            <input type="text" value={form.y} onChange={e => setForm({...form, y: e.target.value})} />
                        </label>
                        <br/>
                        <label>R:
                            <select value={form.r} onChange={e => setForm({...form, r: Number(e.target.value)})}>
                                {[-4,-3,-2,-1,0,1,2,3,4].filter(v => v > 0).map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </label>
                        <br/>
                        <button onClick={handleSubmit}>Проверить</button>
                        <button onClick={() => dispatch(clearPoints())}>Очистить</button>
                        {errors && <div style={{color:'red'}}>{errors}</div>}
                    </div>
                </div>

                <div className="results-table">
                    <table>
                        <thead>
                        <tr><th>X</th><th>Y</th><th>R</th><th>результат</th><th>время выполнения НС</th></tr>
                        </thead>
                        <tbody>
                        {points.map(p => (
                            <tr key={p.id}>
                                <td>{p.x.toFixed(2)}</td>
                                <td>{p.y.toFixed(2)}</td>
                                <td>{p.r}</td>
                                <td>{p.hit ? 'Hit' : 'Miss'}</td>
                                <td>{p.executionTime}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button disabled={currentPage === 0} onClick={() => dispatch(fetchPoints(currentPage - 1))}>Prev</button>
                    <span> {currentPage + 1} </span>
                    <button disabled={currentPage >= totalPages - 1} onClick={() => dispatch(fetchPoints(currentPage + 1))}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;