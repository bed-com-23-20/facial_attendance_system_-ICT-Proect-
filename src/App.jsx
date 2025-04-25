import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import classes from './App.module.css'

import Dashboard from './components/Dashboard'
import Enrollment from './components/Enrollment'
import Attendance from './components/Attendance'
// import EnrollmentForm from './components/EnrollmentForm'

const query = {
    me: {
        resource: 'me',
    },
}

const MyApp = () => {
    const { error, loading, data } = useDataQuery(query)

    if (error) return <span>{i18n.t('ERROR')}</span>
    if (loading) return <span>{i18n.t('Loading...')}</span>

    return (
        <div className={classes.container}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/enrollment" element={<Enrollment />} />
                    <Route path="/attendance" element={<Attendance />} />
                    {/* Add more pages below as needed */}
                    {/* <Route path="/enrollment-form" element={<EnrollmentForm />} /> */}
                </Routes>
            </Router>
        </div>
    )
}

export default MyApp
