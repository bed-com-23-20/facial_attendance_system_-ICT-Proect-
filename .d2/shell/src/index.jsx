import { CssReset } from '@dhis2/ui'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'typeface-roboto'
import './index.css'
import { BrowserRouter} from "react-router-dom";

const container = document.getElementById('dhis2-app-root')
const root = createRoot(container)
root.render(
    <>
        <CssReset />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </>
)
