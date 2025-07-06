import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Camera, Play, Pause, Square, Car, Fuel, Users, Calendar, BarChart3, Settings, LogOut, Globe, Plus, DollarSign, FileText, Folder } from 'lucide-react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// Translations object
const translations = {
  en: {
    // General
    fenix: 'FENIX',
    constructionTracker: 'Construction Tracker',
    weBuildBetterTomorrow: 'We build better tomorrow',
    loading: 'Loading...',
    cancel: 'Cancel',
    next: 'Next',
    back: 'Back',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
    yes: 'Yes',
    no: 'No',
    
    // Login
    email: 'Email',
    password: 'Password',
    login: 'Login',
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    invalidCredentials: 'Invalid credentials',
    
    // Work Status
    workStatus: 'Work Status',
    notStarted: 'Not Started',
    working: 'Working',
    onBreak: 'On Break',
    idle: 'Idle',
    completed: 'Completed',
    started: 'Started',
    vehicle: 'Vehicle',
    machine: 'Machine',
    workingSite: 'Working Site',
    selectWorkingSite: 'Select Working Site',
    startKilometers: 'Start Kilometers',
    endKilometers: 'End Kilometers',
    kilometers: 'Kilometers',
    distanceTraveled: 'Distance Traveled',
    workDescription: 'Work Description',
    screenshots: 'Screenshots',
    breaks: 'Breaks',
    
    // Actions
    startWork: 'Start Work',
    endWork: 'End Work',
    takeBreak: 'Take Break',
    resumeWork: 'Resume Work',
    takeScreenshot: 'Take Screenshot',
    takeWorkPhoto: 'Take Work Photo',
    workPhotoCaptured: 'Work photo captured',
    
    // Modals
    selectVehicleKilometers: 'Select Vehicle & Kilometers',
    selectMachineWorkDetails: 'Select Machine & Work Details',
    endWorkVehicleKilometers: 'End Work - Vehicle Kilometers',
    selectedVehicle: 'Selected Vehicle',
    machineUsed: 'Machine Used',
    selectVehicle: 'Select a vehicle',
    selectMachine: 'Select a machine',
    enterKilometers: 'Enter kilometers',
    describeWork: 'Describe your work for today...',
    enterFinalOdometer: 'Enter final odometer reading',
    startKilometersLabel: 'Start Kilometers',
    
    // Admin Panel
    adminDashboard: 'Admin Dashboard',
    vehicleMachinePanel: 'Vehicle & Machine Panel',
    employee: 'Employee',
    currentKilometers: 'Current Kilometers',
    status: 'Status',
    notWorking: 'Not Working',
    overview: 'Overview',
    employees: 'Employees',
    reports: 'Reports',
    workHistory: 'Work History',
    map: 'Map',
    locationHistory: 'Location History',
    worksiteHours: 'Worksite Hours',
    materials: 'Materials',
    activeWorkers: 'Active Workers',
    totalHoursToday: 'Total Hours Today',
    completedJobs: 'Completed Jobs',
    recentActivity: 'Recent Activity',
    completedWork: 'Completed work',
    startedWork: 'Started work',
    onBreakStatus: 'On break',
    
    // Work History
    completedWorkSessions: 'Completed Work Sessions',
    noCompletedSessions: 'No completed work sessions found for the selected filters.',
    gasUsed: 'Gas Used',
    breaksTaken: 'breaks taken',
    locationUpdates: 'location updates',
    
    // Map
    activeWorkersMap: 'Active Workers',
    noActiveWorkers: 'No active workers at the moment',
    lastUpdate: 'Last update',
    locationUnavailable: 'Location unavailable',
    
    // Language
    language: 'Language',
    english: 'English',
    macedonian: 'Macedonian',
    albanian: 'Albanian',
    german: 'German',
    spanish: 'Spanish',
    
    // Worksite Hours
    hoursWorked: 'Hours Worked',
    siteHours: 'Site Hours',
    totalHours: 'Total Hours',
    averageHours: 'Average Hours',
    thisMonth: 'This Month',
    thisWeek: 'This Week',
    today: 'Today',
    
    // Materials
    materialsUsed: 'Materials Used',
    addMaterial: 'Add Material',
    materialName: 'Material Name',
    quantity: 'Quantity',
    unit: 'Unit',
    cost: 'Cost',
    date: 'Date',
    addMaterials: 'Add Materials',
    materialType: 'Material Type',
    cement: 'Cement',
    steel: 'Steel',
    wood: 'Wood',
    concrete: 'Concrete',
    bricks: 'Bricks',
    sand: 'Sand',
    gravel: 'Gravel',
    other: 'Other',
    bags: 'Bags',
    tons: 'Tons',
    pieces: 'Pieces',
    cubicMeters: 'Cubic Meters',
    kilograms: 'Kilograms',
    liters: 'Liters',
    totalCost: 'Total Cost',
    dailyMaterials: 'Daily Materials',
    materialReport: 'Material Report',
    selectMaterialType: 'Select Material Type',
    selectUnit: 'Select Unit',
    totalMaterials: 'Total Materials',
    
    // Work Photos
    workPhotos: 'Work Photos',
    totalPhotos: 'Total Photos',
    noWorkPhotos: 'No work photos available',
    workPhotoDetails: 'Work Photo Details',
    photoDetails: 'Photo Details',
    workDetails: 'Work Details',
    fileName: 'File Name',
    fileSize: 'File Size',
    coordinates: 'Coordinates',
    
    // Project Documents
    projectDocuments: 'Project Documents',
    addDocument: 'Add Document',
    documentName: 'Document Name',
    documentDescription: 'Document Description',
    documentCategory: 'Document Category',
    documentFile: 'Document File',
    totalDocuments: 'Total Documents',
    noDocuments: 'No documents available',
    documentDetails: 'Document Details',
    uploadedBy: 'Uploaded By',
    uploadedAt: 'Uploaded At',
    viewDocument: 'View Document',
    selectWorksite: 'Select Worksite',
    selectCategory: 'Select Category',
    supportedFormats: 'Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, GIF'
  },
  
  mk: {
    // General
    fenix: 'ФЕНИКС',
    constructionTracker: 'Градежен Тракер',
    weBuildBetterTomorrow: 'Градиме подобро утре',
    loading: 'Се вчитува...',
    cancel: 'Откажи',
    next: 'Следно',
    back: 'Назад',
    save: 'Зачувај',
    edit: 'Уреди',
    delete: 'Избриши',
    close: 'Затвори',
    yes: 'Да',
    no: 'Не',
    
    // Login
    email: 'Е-пошта',
    password: 'Лозинка',
    login: 'Најави се',
    enterEmail: 'Внесете ја вашата е-пошта',
    enterPassword: 'Внесете ја вашата лозинка',
    invalidCredentials: 'Невалидни податоци',
    
    // Work Status
    workStatus: 'Статус на работа',
    notStarted: 'Не е започнато',
    working: 'Работи',
    onBreak: 'На пауза',
    idle: 'Неактивен',
    completed: 'Завршено',
    started: 'Започнато',
    vehicle: 'Возило',
    machine: 'Машина',
    workingSite: 'Работно место',
    selectWorkingSite: 'Избери работно место',
    startKilometers: 'Почетни километри',
    endKilometers: 'Крајни километри',
    kilometers: 'Километри',
    distanceTraveled: 'Поминато растојание',
    workDescription: 'Опис на работата',
    screenshots: 'Слики од екранот',
    breaks: 'Паузи',
    
    // Actions
    startWork: 'Започни работа',
    endWork: 'Заврши работа',
    takeBreak: 'Земи пауза',
    resumeWork: 'Продолжи работа',
    takeScreenshot: 'Земи слика од екранот',
    takeWorkPhoto: 'Земи слика од работата',
    workPhotoCaptured: 'Сликата од работата е зачувана',
    
    // Modals
    selectVehicleKilometers: 'Избери возило и километри',
    selectMachineWorkDetails: 'Избери машина и детали за работата',
    endWorkVehicleKilometers: 'Заврши работа - километри на возилото',
    selectedVehicle: 'Избрано возило',
    machineUsed: 'Користена машина',
    selectVehicle: 'Избери возило',
    selectMachine: 'Избери машина',
    enterKilometers: 'Внеси километри',
    describeWork: 'Опиши ја твојата работа за денес...',
    enterFinalOdometer: 'Внеси крајно одчитување на одометарот',
    startKilometersLabel: 'Почетни километри',
    
    // Admin Panel
    adminDashboard: 'Админ панел',
    vehicleMachinePanel: 'Панел за возила и машини',
    employee: 'Вработен',
    currentKilometers: 'Тековни километри',
    status: 'Статус',
    notWorking: 'Не работи',
    overview: 'Преглед',
    employees: 'Вработени',
    reports: 'Извештаи',
    workHistory: 'Историја на работа',
    map: 'Мапа',
    locationHistory: 'Историја на локации',
    activeWorkers: 'Активни работници',
    totalHoursToday: 'Вкупно часови денес',
    completedJobs: 'Завршени работи',
    recentActivity: 'Неодамнешна активност',
    completedWork: 'Завршена работа',
    startedWork: 'Започната работа',
    onBreakStatus: 'На пауза',
    
    // Work History
    completedWorkSessions: 'Завршени работни сесии',
    noCompletedSessions: 'Не се пронајдени завршени работни сесии за избраните филтри.',
    gasUsed: 'Искористено гориво',
    breaksTaken: 'земени паузи',
    locationUpdates: 'ажурирања на локација',
    
    // Map
    activeWorkersMap: 'Активни работници',
    noActiveWorkers: 'Нема активни работници во моментот',
    lastUpdate: 'Последно ажурирање',
    locationUnavailable: 'Локацијата не е достапна',
    
    // Language
    language: 'Јазик',
    english: 'Англиски',
    macedonian: 'Македонски',
    albanian: 'Албански',
    german: 'Германски',
    spanish: 'Шпански',
    
    // Worksite Hours
    worksiteHours: 'Часови на работно место',
    hoursWorked: 'Оработени часови',
    siteHours: 'Часови на место',
    totalHours: 'Вкупно часови',
    averageHours: 'Просечни часови',
    thisMonth: 'Овој месец',
    thisWeek: 'Оваа недела',
    today: 'Денес',
    
    // Materials
    materials: 'Материјали',
    materialsUsed: 'Искористени материјали',
    addMaterial: 'Додај материјал',
    materialName: 'Име на материјал',
    quantity: 'Количина',
    unit: 'Единица',
    cost: 'Цена',
    date: 'Датум',
    addMaterials: 'Додај материјали',
    materialType: 'Тип на материјал',
    cement: 'Цимент',
    steel: 'Челик',
    wood: 'Дрво',
    concrete: 'Бетон',
    bricks: 'Тули',
    sand: 'Песок',
    gravel: 'Шут',
    other: 'Друго',
    bags: 'Кеси',
    tons: 'Тони',
    pieces: 'Парчиња',
    cubicMeters: 'Кубни метри',
    kilograms: 'Килограми',
    liters: 'Литри',
    totalCost: 'Вкупна цена',
    dailyMaterials: 'Дневни материјали',
    materialReport: 'Извештај за материјали',
    selectMaterialType: 'Избери тип на материјал',
    selectUnit: 'Избери единица',
    totalMaterials: 'Вкупно материјали',
    
    // Work Photos
    workPhotos: 'Слики од работата',
    totalPhotos: 'Вкупно слики',
    noWorkPhotos: 'Нема достапни слики од работата',
    workPhotoDetails: 'Детали за сликата од работата',
    photoDetails: 'Детали за сликата',
    workDetails: 'Детали за работата',
    fileName: 'Име на датотека',
    fileSize: 'Големина на датотека',
    coordinates: 'Координати',
    
    // Project Documents
    projectDocuments: 'Документи на проектот',
    addDocument: 'Додај документ',
    documentName: 'Име на документот',
    documentDescription: 'Опис на документот',
    documentCategory: 'Категорија на документот',
    documentFile: 'Датотека на документот',
    totalDocuments: 'Вкупно документи',
    noDocuments: 'Нема достапни документи',
    documentDetails: 'Детали за документот',
    uploadedBy: 'Качено од',
    uploadedAt: 'Качено на',
    viewDocument: 'Прегледај документ',
    selectWorksite: 'Избери работно место',
    selectCategory: 'Избери категорија',
    supportedFormats: 'Поддржани формати: PDF, DOC, DOCX, TXT, JPG, PNG, GIF'
  },
  
  sq: {
    // General
    fenix: 'FENIKS',
    constructionTracker: 'Gjurues i Ndërtimit',
    weBuildBetterTomorrow: 'Ne ndërtojmë një të nesër më të mirë',
    loading: 'Duke u ngarkuar...',
    cancel: 'Anulo',
    next: 'Tjetra',
    back: 'Kthehu',
    save: 'Ruaj',
    edit: 'Redakto',
    delete: 'Fshi',
    close: 'Mbyll',
    yes: 'Po',
    no: 'Jo',
    
    // Login
    email: 'Email',
    password: 'Fjalëkalimi',
    login: 'Hyr',
    enterEmail: 'Shkruani emailin tuaj',
    enterPassword: 'Shkruani fjalëkalimin tuaj',
    invalidCredentials: 'Kredencialet e pavlefshme',
    
    // Work Status
    workStatus: 'Statusi i Punës',
    notStarted: 'Nuk ka filluar',
    working: 'Duke punuar',
    onBreak: 'Në pushim',
    idle: 'Joaktiv',
    completed: 'Përfunduar',
    started: 'Filluar',
    vehicle: 'Vozitja',
    machine: 'Makina',
    workingSite: 'Vendndodhja e punës',
    selectWorkingSite: 'Zgjidh vendndodhjen e punës',
    startKilometers: 'Kilometrat e fillimit',
    endKilometers: 'Kilometrat e fundit',
    kilometers: 'Kilometra',
    distanceTraveled: 'Distanca e udhëtuar',
    workDescription: 'Përshkrimi i punës',
    screenshots: 'Fotografitë e ekranit',
    breaks: 'Pushimet',
    
    // Actions
    startWork: 'Fillo punën',
    endWork: 'Përfundo punën',
    takeBreak: 'Merre pushim',
    resumeWork: 'Vazhdo punën',
    takeScreenshot: 'Merre fotografi të ekranit',
    takeWorkPhoto: 'Merre fotografi të punës',
    workPhotoCaptured: 'Fotografia e punës u kap',
    
    // Modals
    selectVehicleKilometers: 'Zgjidh vozitjen dhe kilometrat',
    selectMachineWorkDetails: 'Zgjidh makinën dhe detajet e punës',
    endWorkVehicleKilometers: 'Përfundo punën - kilometrat e vozitjes',
    selectedVehicle: 'Vozitja e zgjedhur',
    machineUsed: 'Makina e përdorur',
    selectVehicle: 'Zgjidh një vozitje',
    selectMachine: 'Zgjidh një makinë',
    enterKilometers: 'Shkruani kilometrat',
    describeWork: 'Përshkruani punën tuaj për sot...',
    enterFinalOdometer: 'Shkruani leximin përfundimtar të odometrit',
    startKilometersLabel: 'Kilometrat e fillimit',
    
    // Admin Panel
    adminDashboard: 'Paneli i Administratorit',
    vehicleMachinePanel: 'Paneli i Vozitjeve dhe Makinave',
    employee: 'Punëtori',
    currentKilometers: 'Kilometrat aktuale',
    status: 'Statusi',
    notWorking: 'Nuk punon',
    overview: 'Përmbledhje',
    employees: 'Punëtorët',
    reports: 'Raportet',
    workHistory: 'Historia e punës',
    map: 'Harta',
    locationHistory: 'Historia e vendndodhjes',
    activeWorkers: 'Punëtorët aktivë',
    totalHoursToday: 'Orët totale sot',
    completedJobs: 'Punët e përfunduara',
    recentActivity: 'Aktiviteti i fundit',
    completedWork: 'Puna e përfunduar',
    startedWork: 'Puna e filluar',
    onBreakStatus: 'Në pushim',
    
    // Work History
    completedWorkSessions: 'Sesionet e punës së përfunduar',
    noCompletedSessions: 'Nuk u gjetën sesione të përfunduara për filtrat e zgjedhur.',
    gasUsed: 'Karburanti i përdorur',
    breaksTaken: 'pushime të marra',
    locationUpdates: 'përditësime të vendndodhjes',
    
    // Map
    activeWorkersMap: 'Punëtorët aktivë',
    noActiveWorkers: 'Nuk ka punëtorë aktivë në këtë moment',
    lastUpdate: 'Përditësimi i fundit',
    locationUnavailable: 'Vendndodhja nuk është e disponueshme',
    
    // Language
    language: 'Gjuha',
    english: 'Anglisht',
    macedonian: 'Maqedonisht',
    albanian: 'Shqip',
    german: 'Gjermanisht',
    spanish: 'Spanjisht',
    
    // Worksite Hours
    worksiteHours: 'Orët e vendit të punës',
    hoursWorked: 'Orët e punuara',
    siteHours: 'Orët e vendit',
    totalHours: 'Orët totale',
    averageHours: 'Orët mesatare',
    thisMonth: 'Këtë muaj',
    thisWeek: 'Këtë javë',
    today: 'Sot',
    
    // Materials
    materials: 'Materialet',
    materialsUsed: 'Materialet e përdorura',
    addMaterial: 'Shto material',
    materialName: 'Emri i materialit',
    quantity: 'Sasia',
    unit: 'Njësia',
    cost: 'Kostoja',
    date: 'Data',
    addMaterials: 'Shto materiale',
    materialType: 'Lloji i materialit',
    cement: 'Çimento',
    steel: 'Çelik',
    wood: 'Dru',
    concrete: 'Betoni',
    bricks: 'Tulla',
    sand: 'Rëra',
    gravel: 'Gur i grimcuar',
    other: 'Tjetër',
    bags: 'Thasë',
    tons: 'Ton',
    pieces: 'Copë',
    cubicMeters: 'Metra kub',
    kilograms: 'Kilogram',
    liters: 'Litra',
    totalCost: 'Kostoja totale',
    dailyMaterials: 'Materialet ditore',
    materialReport: 'Raporti i materialeve',
    selectMaterialType: 'Zgjidh llojin e materialit',
    selectUnit: 'Zgjidh njësinë',
    totalMaterials: 'Materialet totale',
    
    // Work Photos
    workPhotos: 'Fotot e punës',
    totalPhotos: 'Fotot totale',
    noWorkPhotos: 'Nuk ka foto të punës të disponueshme',
    workPhotoDetails: 'Detajet e fotos së punës',
    photoDetails: 'Detajet e fotos',
    workDetails: 'Detajet e punës',
    fileName: 'Emri i file',
    fileSize: 'Madhësia e file',
    coordinates: 'Koordinatat',
    
    // Project Documents
    projectDocuments: 'Dokumentet e projektit',
    addDocument: 'Shto dokument',
    documentName: 'Emri i dokumentit',
    documentDescription: 'Përshkrimi i dokumentit',
    documentCategory: 'Kategoria e dokumentit',
    documentFile: 'Dosja e dokumentit',
    totalDocuments: 'Dokumentet totale',
    noDocuments: 'Nuk ka dokumente të disponueshme',
    documentDetails: 'Detajet e dokumentit',
    uploadedBy: 'Ngarkuar nga',
    uploadedAt: 'Ngarkuar më',
    viewDocument: 'Shiko dokumentin',
    selectWorksite: 'Zgjidh vendndodhjen e punës',
    selectCategory: 'Zgjidh kategorinë',
    supportedFormats: 'Formate të mbështetura: PDF, DOC, DOCX, TXT, JPG, PNG, GIF'
  },
  
  de: {
    // General
    fenix: 'FENIX',
    constructionTracker: 'Bau-Tracker',
    weBuildBetterTomorrow: 'Wir bauen eine bessere Zukunft',
    loading: 'Wird geladen...',
    cancel: 'Abbrechen',
    next: 'Weiter',
    back: 'Zurück',
    save: 'Speichern',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    close: 'Schließen',
    yes: 'Ja',
    no: 'Nein',
    
    // Login
    email: 'E-Mail',
    password: 'Passwort',
    login: 'Anmelden',
    enterEmail: 'Geben Sie Ihre E-Mail ein',
    enterPassword: 'Geben Sie Ihr Passwort ein',
    invalidCredentials: 'Ungültige Anmeldedaten',
    
    // Work Status
    workStatus: 'Arbeitsstatus',
    notStarted: 'Nicht gestartet',
    working: 'Arbeitet',
    onBreak: 'Pause',
    idle: 'Inaktiv',
    completed: 'Abgeschlossen',
    started: 'Gestartet',
    vehicle: 'Fahrzeug',
    machine: 'Maschine',
    workingSite: 'Arbeitsplatz',
    selectWorkingSite: 'Arbeitsplatz auswählen',
    startKilometers: 'Startkilometer',
    endKilometers: 'Endkilometer',
    kilometers: 'Kilometer',
    distanceTraveled: 'Zurückgelegte Strecke',
    workDescription: 'Arbeitsbeschreibung',
    screenshots: 'Screenshots',
    breaks: 'Pausen',
    
    // Actions
    startWork: 'Arbeit beginnen',
    endWork: 'Arbeit beenden',
    takeBreak: 'Pause machen',
    resumeWork: 'Arbeit fortsetzen',
    takeScreenshot: 'Screenshot machen',
    takeWorkPhoto: 'Arbeitsfoto machen',
    workPhotoCaptured: 'Arbeitsfoto aufgenommen',
    
    // Modals
    selectVehicleKilometers: 'Fahrzeug und Kilometer auswählen',
    selectMachineWorkDetails: 'Maschine und Arbeitsdetails auswählen',
    endWorkVehicleKilometers: 'Arbeit beenden - Fahrzeugkilometer',
    selectedVehicle: 'Ausgewähltes Fahrzeug',
    machineUsed: 'Verwendete Maschine',
    selectVehicle: 'Fahrzeug auswählen',
    selectMachine: 'Maschine auswählen',
    enterKilometers: 'Kilometer eingeben',
    describeWork: 'Beschreiben Sie Ihre Arbeit für heute...',
    enterFinalOdometer: 'Endstand des Tachometers eingeben',
    startKilometersLabel: 'Startkilometer',
    
    // Admin Panel
    adminDashboard: 'Admin-Dashboard',
    vehicleMachinePanel: 'Fahrzeug- und Maschinen-Panel',
    employee: 'Mitarbeiter',
    currentKilometers: 'Aktuelle Kilometer',
    status: 'Status',
    notWorking: 'Arbeitet nicht',
    overview: 'Übersicht',
    employees: 'Mitarbeiter',
    reports: 'Berichte',
    workHistory: 'Arbeitsverlauf',
    map: 'Karte',
    locationHistory: 'Standortverlauf',
    activeWorkers: 'Aktive Arbeiter',
    totalHoursToday: 'Gesamtstunden heute',
    completedJobs: 'Abgeschlossene Arbeiten',
    recentActivity: 'Letzte Aktivität',
    completedWork: 'Arbeit abgeschlossen',
    startedWork: 'Arbeit gestartet',
    onBreakStatus: 'Pause',
    
    // Work History
    completedWorkSessions: 'Abgeschlossene Arbeitssitzungen',
    noCompletedSessions: 'Keine abgeschlossenen Arbeitssitzungen für die ausgewählten Filter gefunden.',
    gasUsed: 'Verbrauchter Kraftstoff',
    breaksTaken: 'Pausen genommen',
    locationUpdates: 'Standortaktualisierungen',
    
    // Map
    activeWorkersMap: 'Aktive Arbeiter',
    noActiveWorkers: 'Derzeit keine aktiven Arbeiter',
    lastUpdate: 'Letzte Aktualisierung',
    locationUnavailable: 'Standort nicht verfügbar',
    
    // Language
    language: 'Sprache',
    english: 'Englisch',
    macedonian: 'Mazedonisch',
    albanian: 'Albanisch',
    german: 'Deutsch',
    spanish: 'Spanisch',
    
    // Worksite Hours
    worksiteHours: 'Arbeitsplatz-Stunden',
    hoursWorked: 'Gearbeitete Stunden',
    siteHours: 'Stunden am Standort',
    totalHours: 'Gesamtstunden',
    averageHours: 'Durchschnittsstunden',
    thisMonth: 'Diesen Monat',
    thisWeek: 'Diese Woche',
    today: 'Heute',
    
    // Materials
    materials: 'Materialien',
    materialsUsed: 'Verwendete Materialien',
    addMaterial: 'Material hinzufügen',
    materialName: 'Materialname',
    quantity: 'Menge',
    unit: 'Einheit',
    cost: 'Kosten',
    date: 'Datum',
    addMaterials: 'Materialien hinzufügen',
    materialType: 'Materialtyp',
    cement: 'Zement',
    steel: 'Stahl',
    wood: 'Holz',
    concrete: 'Beton',
    bricks: 'Ziegel',
    sand: 'Sand',
    gravel: 'Kies',
    other: 'Andere',
    bags: 'Säcke',
    tons: 'Tonnen',
    pieces: 'Stücke',
    cubicMeters: 'Kubikmeter',
    kilograms: 'Kilogramm',
    liters: 'Liter',
    totalCost: 'Gesamtkosten',
    dailyMaterials: 'Tägliche Materialien',
    materialReport: 'Materialbericht',
    selectMaterialType: 'Materialtyp auswählen',
    selectUnit: 'Einheit auswählen',
    totalMaterials: 'Gesamtmaterialien',
    
    // Work Photos
    workPhotos: 'Arbeitsfotos',
    totalPhotos: 'Gesamtfotos',
    noWorkPhotos: 'Keine Arbeitsfotos verfügbar',
    workPhotoDetails: 'Arbeitsfoto-Details',
    photoDetails: 'Foto-Details',
    workDetails: 'Arbeitsdetails',
    fileName: 'Dateiname',
    fileSize: 'Dateigröße',
    coordinates: 'Koordinaten',
    
    // Project Documents
    projectDocuments: 'Projektdokumente',
    addDocument: 'Dokument hinzufügen',
    documentName: 'Dokumentname',
    documentDescription: 'Dokumentbeschreibung',
    documentCategory: 'Dokumentkategorie',
    documentFile: 'Dokumentdatei',
    totalDocuments: 'Gesamtdokumente',
    noDocuments: 'Keine Dokumente verfügbar',
    documentDetails: 'Dokumentdetails',
    uploadedBy: 'Hochgeladen von',
    uploadedAt: 'Hochgeladen am',
    viewDocument: 'Dokument anzeigen',
    selectWorksite: 'Arbeitsplatz auswählen',
    selectCategory: 'Kategorie auswählen',
    supportedFormats: 'Unterstützte Formate: PDF, DOC, DOCX, TXT, JPG, PNG, GIF'
  },
  
  es: {
    // General
    fenix: 'FENIX',
    constructionTracker: 'Rastreador de Construcción',
    weBuildBetterTomorrow: 'Construimos un mejor mañana',
    loading: 'Cargando...',
    cancel: 'Cancelar',
    next: 'Siguiente',
    back: 'Atrás',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    close: 'Cerrar',
    yes: 'Sí',
    no: 'No',
    
    // Login
    email: 'Correo electrónico',
    password: 'Contraseña',
    login: 'Iniciar sesión',
    enterEmail: 'Ingrese su correo electrónico',
    enterPassword: 'Ingrese su contraseña',
    invalidCredentials: 'Credenciales inválidas',
    
    // Work Status
    workStatus: 'Estado del trabajo',
    notStarted: 'No iniciado',
    working: 'Trabajando',
    onBreak: 'En descanso',
    idle: 'Inactivo',
    completed: 'Completado',
    started: 'Iniciado',
    vehicle: 'Vehículo',
    machine: 'Máquina',
    workingSite: 'Sitio de trabajo',
    selectWorkingSite: 'Seleccionar sitio de trabajo',
    startKilometers: 'Kilómetros iniciales',
    endKilometers: 'Kilómetros finales',
    kilometers: 'Kilómetros',
    distanceTraveled: 'Distancia recorrida',
    workDescription: 'Descripción del trabajo',
    screenshots: 'Capturas de pantalla',
    breaks: 'Descansos',
    
    // Actions
    startWork: 'Iniciar trabajo',
    endWork: 'Finalizar trabajo',
    takeBreak: 'Tomar descanso',
    resumeWork: 'Reanudar trabajo',
    takeScreenshot: 'Tomar captura de pantalla',
    takeWorkPhoto: 'Tomar foto del trabajo',
    workPhotoCaptured: 'Foto del trabajo capturada',
    
    // Modals
    selectVehicleKilometers: 'Seleccionar vehículo y kilómetros',
    selectMachineWorkDetails: 'Seleccionar máquina y detalles del trabajo',
    endWorkVehicleKilometers: 'Finalizar trabajo - kilómetros del vehículo',
    selectedVehicle: 'Vehículo seleccionado',
    machineUsed: 'Máquina utilizada',
    selectVehicle: 'Seleccionar vehículo',
    selectMachine: 'Seleccionar máquina',
    enterKilometers: 'Ingresar kilómetros',
    describeWork: 'Describa su trabajo para hoy...',
    enterFinalOdometer: 'Ingresar lectura final del odómetro',
    startKilometersLabel: 'Kilómetros iniciales',
    
    // Admin Panel
    adminDashboard: 'Panel de administrador',
    vehicleMachinePanel: 'Panel de vehículos y máquinas',
    employee: 'Empleado',
    currentKilometers: 'Kilómetros actuales',
    status: 'Estado',
    notWorking: 'No está trabajando',
    overview: 'Resumen',
    employees: 'Empleados',
    reports: 'Reportes',
    workHistory: 'Historial de trabajo',
    map: 'Mapa',
    locationHistory: 'Historial de ubicación',
    activeWorkers: 'Trabajadores activos',
    totalHoursToday: 'Total de horas hoy',
    completedJobs: 'Trabajos completados',
    recentActivity: 'Actividad reciente',
    completedWork: 'Trabajo completado',
    startedWork: 'Trabajo iniciado',
    onBreakStatus: 'En descanso',
    
    // Work History
    completedWorkSessions: 'Sesiones de trabajo completadas',
    noCompletedSessions: 'No se encontraron sesiones de trabajo completadas para los filtros seleccionados.',
    gasUsed: 'Combustible utilizado',
    breaksTaken: 'descansos tomados',
    locationUpdates: 'actualizaciones de ubicación',
    
    // Map
    activeWorkersMap: 'Trabajadores activos',
    noActiveWorkers: 'No hay trabajadores activos en este momento',
    lastUpdate: 'Última actualización',
    locationUnavailable: 'Ubicación no disponible',
    
    // Language
    language: 'Idioma',
    english: 'Inglés',
    macedonian: 'Macedonio',
    albanian: 'Albanés',
    german: 'Alemán',
    spanish: 'Español',
    
    // Worksite Hours
    worksiteHours: 'Horas de Sitio',
    hoursWorked: 'Horas Trabajadas',
    siteHours: 'Horas de Sitio',
    totalHours: 'Horas Totales',
    averageHours: 'Horas Promedio',
    thisMonth: 'Este Mes',
    thisWeek: 'Esta Semana',
    today: 'Hoy',
    
    // Materials
    materials: 'Materiales',
    materialsUsed: 'Materiales Utilizados',
    addMaterial: 'Agregar Material',
    materialName: 'Nombre del Material',
    quantity: 'Cantidad',
    unit: 'Unidad',
    cost: 'Costo',
    date: 'Fecha',
    addMaterials: 'Agregar Materiales',
    materialType: 'Tipo de Material',
    cement: 'Cemento',
    steel: 'Acero',
    wood: 'Madera',
    concrete: 'Concreto',
    bricks: 'Ladrillos',
    sand: 'Arena',
    gravel: 'Grava',
    other: 'Otro',
    bags: 'Bolsas',
    tons: 'Toneladas',
    pieces: 'Piezas',
    cubicMeters: 'Metros Cúbicos',
    kilograms: 'Kilogramos',
    liters: 'Litros',
    totalCost: 'Costo Total',
    dailyMaterials: 'Materiales Diarios',
    materialReport: 'Reporte de Materiales',
    selectMaterialType: 'Seleccionar Tipo de Material',
    selectUnit: 'Seleccionar Unidad',
    totalMaterials: 'Materiales Totales',
    
    // Work Photos
    workPhotos: 'Fotos del Trabajo',
    totalPhotos: 'Fotos Totales',
    noWorkPhotos: 'No hay fotos del trabajo disponibles',
    workPhotoDetails: 'Detalles de la Foto del Trabajo',
    photoDetails: 'Detalles de la Foto',
    workDetails: 'Detalles del Trabajo',
    fileName: 'Nombre del Archivo',
    fileSize: 'Tamaño del Archivo',
    coordinates: 'Coordenadas',
    
    // Project Documents
    projectDocuments: 'Documentos del Proyecto',
    addDocument: 'Agregar Documento',
    documentName: 'Nombre del Documento',
    documentDescription: 'Descripción del Documento',
    documentCategory: 'Categoría del Documento',
    documentFile: 'Archivo del Documento',
    totalDocuments: 'Documentos Totales',
    noDocuments: 'No hay documentos disponibles',
    documentDetails: 'Detalles del Documento',
    uploadedBy: 'Subido por',
    uploadedAt: 'Subido el',
    viewDocument: 'Ver Documento',
    selectWorksite: 'Seleccionar Sitio de Trabajo',
    selectCategory: 'Seleccionar Categoría',
    supportedFormats: 'Formatos Soportados: PDF, DOC, DOCX, TXT, JPG, PNG, GIF'
  }
};

const EmployeeTrackingApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentView, setCurrentView] = useState('splash');
  const [workSession, setWorkSession] = useState(null);
  const [location, setLocation] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('mk');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedWorkingSite, setSelectedWorkingSite] = useState('');
  
  const [materials, setMaterials] = useState([]);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    type: '',
    quantity: '',
    unit: '',
    cost: '',
    date: new Date().toISOString().slice(0, 10)
  });
  const [workPhotos, setWorkPhotos] = useState([]);
  const [projectDocuments, setProjectDocuments] = useState([]);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: '',
    description: '',
    worksiteId: '',
    file: null,
    category: '',
    date: new Date().toISOString().slice(0, 10)
  });
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Petre', email: 'petre@fenix.com', password: 'admin123' },
    { id: 2, name: 'Ilija', email: 'ilija@fenix.com', password: 'admin123' },
    { id: 3, name: 'Vojne', email: 'vojne@fenix.com', password: 'admin123' },
    { id: 4, name: 'Dragan', email: 'dragan@fenix.com', password: 'admin123' },
    { id: 5, name: 'Tino', email: 'tino@fenix.com', password: 'admin123' },
    { id: 6, name: 'Vane', email: 'vane@fenix.com', password: 'admin123' }
  ]);
  const [workLogs, setWorkLogs] = useState([]);
  const [vehicles] = useState([
    { id: 1, name: 'Le Bus na pero', plate: 'ABC-123' },
    { id: 2, name: 'Le Bus na pero', plate: 'DEF-456' },
    { id: 3, name: 'Truck #1', plate: 'GHI-789' },
    { id: 4, name: 'Le Bus na pero', plate: 'XYZ-999' },
    { id: 5, name: 'Personal Car', plate: 'Own Vehicle' }
  ]);

  const [machines] = useState([
    { id: 1, name: 'Excavator', type: 'Heavy Equipment' },
    { id: 2, name: 'Bulldozer', type: 'Heavy Equipment' },
    { id: 3, name: 'Crane', type: 'Lifting Equipment' },
    { id: 4, name: 'Concrete Mixer', type: 'Construction Equipment' },
    { id: 5, name: 'Drill Machine', type: 'Power Tools' },
    { id: 6, name: 'Welding Machine', type: 'Power Tools' },
    { id: 7, name: 'Generator', type: 'Power Equipment' },
    { id: 8, name: 'Compressor', type: 'Air Equipment' },
    { id: 9, name: 'No Machine Used', type: 'None' }
  ]);

  const [workingSites] = useState([
    { id: 1, name: 'Site 1', location: 'Downtown Project' },
    { id: 2, name: 'Site 2', location: 'Suburban Development' },
    { id: 3, name: 'Site 3', location: 'Industrial Zone' },
    { id: 4, name: 'Site 4', location: 'Residential Complex' },
    { id: 5, name: 'Site 5', location: 'Commercial Center' },
    { id: 6, name: 'Site 6', location: 'Highway Extension' },
    { id: 7, name: 'Site 7', location: 'Bridge Construction' },
    { id: 8, name: 'Site 8', location: 'Tunnel Project' },
    { id: 9, name: 'Site 9', location: 'Airport Terminal' },
    { id: 10, name: 'Site 10', location: 'Shopping Mall' }
  ]);

  const [materialTypes] = useState([
    { id: 'cement', name: 'Cement' },
    { id: 'steel', name: 'Steel' },
    { id: 'wood', name: 'Wood' },
    { id: 'concrete', name: 'Concrete' },
    { id: 'bricks', name: 'Bricks' },
    { id: 'sand', name: 'Sand' },
    { id: 'gravel', name: 'Gravel' },
    { id: 'other', name: 'Other' }
  ]);

  const [materialUnits] = useState([
    { id: 'bags', name: 'Bags' },
    { id: 'tons', name: 'Tons' },
    { id: 'pieces', name: 'Pieces' },
    { id: 'cubicMeters', name: 'Cubic Meters' },
    { id: 'kilograms', name: 'Kilograms' },
    { id: 'liters', name: 'Liters' }
  ]);

  const [documentCategories] = useState([
    { id: 'plans', name: 'Plans & Drawings' },
    { id: 'specifications', name: 'Specifications' },
    { id: 'safety', name: 'Safety Documents' },
    { id: 'permits', name: 'Permits & Licenses' },
    { id: 'contracts', name: 'Contracts' },
    { id: 'reports', name: 'Reports' },
    { id: 'instructions', name: 'Work Instructions' },
    { id: 'other', name: 'Other' }
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [employeeLocations, setEmployeeLocations] = useState({});
  const GOOGLE_MAPS_API_KEY = 'AIzaSyAuDjIik681kmwRz56jEQULsxmTif_tFHI';

  // Helper function to get translations
  const t = (key) => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  // Language Selector Component
  const LanguageSelector = () => {
    const languages = [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
      { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'es', name: 'Español', flag: '🇪🇸' }
    ];

    // Close language selector when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (showLanguageSelector && !event.target.closest('.language-selector')) {
          setShowLanguageSelector(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showLanguageSelector]);

    return (
      <div className="relative language-selector">
        <button
          onClick={() => setShowLanguageSelector(!showLanguageSelector)}
          className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition duration-200"
        >
          <Globe size={16} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {languages.find(lang => lang.code === currentLanguage)?.flag} {t('language')}
          </span>
        </button>

        {showLanguageSelector && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-48">
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    setCurrentLanguage(language.code);
                    setShowLanguageSelector(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${
                    currentLanguage === language.code ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-sm font-medium">{language.name}</span>
                  {currentLanguage === language.code && (
                    <span className="ml-auto text-orange-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Splash Screen Component
  const SplashScreen = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrentView('login');
      }, 3000); // Show splash for 3 seconds

      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <img 
              src="/copilot.png" 
              alt="FENIX Logo" 
              className="mx-auto w-64 h-32 object-contain animate-pulse" 
            />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">FENIX</h1>
          <p className="text-xl text-white/90 animate-fade-in-delay">Construction Tracker</p>
          <div className="mt-8">
            <div className="w-16 h-1 bg-white mx-auto rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    );
  };

  // Login Component
  const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
      // Check for admin login
      if (email === 'kango@fenix.com' && password === 'admin123') {
        setCurrentUser({ id: 0, name: 'Admin', email: 'kango@fenix.com' });
        setIsAdmin(true);
        setCurrentView('admin');
        return;
      }

      // Check for employee login
      const employee = employees.find(emp => emp.email === email && emp.password === password);
      if (employee) {
        setCurrentUser(employee);
        setIsAdmin(false);
        setCurrentView('employee');
        getCurrentLocation();
      } else {
        alert(t('invalidCredentials'));
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleLogin();
      }
    };



    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
          {/* Language Selector */}
          <div className="absolute top-4 right-4">
            <LanguageSelector />
          </div>
          
          <div className="text-center mb-8">
            <div className="mb-6">
              <img src="/copilot.png" alt="FENIX Logo" className="mx-auto w-48 h-24 object-contain" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">FENIX</h1>
            <p className="text-gray-600">Construction Tracker</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder={t('enterEmail')}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder={t('enterPassword')}
                required
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
            >
              {t('login')}
            </button>
          </div>
          
          <div className="mt-6 text-sm text-gray-600 text-center">
            <p>{t('weBuildBetterTomorrow')}</p>
          </div>
        </div>
      </div>
    );
  };

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date().toISOString()
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation({ error: 'Location not available' });
        }
      );
    }
  };

  // Employee Dashboard Component
  const EmployeeDashboard = () => {
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedMachine, setSelectedMachine] = useState('');
    const [kilometers, setKilometers] = useState('');
    const [workDescription, setWorkDescription] = useState('');
    const [screenshot, setScreenshot] = useState(null);

    const [showEndWorkModal, setShowEndWorkModal] = useState(false);
    const [endKilometers, setEndKilometers] = useState('');
    const [showStartWorkModal, setShowStartWorkModal] = useState(false);

    // Start work with comprehensive modal
    const startWork = () => {
      console.log('startWork called');
      setShowStartWorkModal(true);
    };

    // Debug modal state changes
    useEffect(() => {
      console.log('showStartWorkModal changed:', showStartWorkModal);
    }, [showStartWorkModal]);

    // Actually start the work session
    const confirmStartWork = () => {
      console.log('confirmStartWork called', { selectedWorkingSite, selectedVehicle, selectedMachine });
      if (!selectedWorkingSite || !selectedVehicle || !selectedMachine) {
        console.log('Missing required fields');
        return;
      }
      
      // Get geolocation and start work
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const startLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: new Date().toISOString()
            };
            // Start work session directly
            const session = {
              id: Date.now(),
              employeeId: currentUser.id,
              employeeName: currentUser.name,
              startTime: new Date().toISOString(),
              startLocation: startLocation,
              workingSite: workingSites.find(s => s.id === parseInt(selectedWorkingSite)),
              vehicle: vehicles.find(v => v.id === parseInt(selectedVehicle)),
              machine: machines.find(m => m.id === parseInt(selectedMachine)),
              kilometers: parseFloat(kilometers) || 0,
              workDescription: workDescription,
              screenshots: [],
              breaks: [],
              status: 'working',
              locationHistory: [startLocation]
            };
            setWorkSession(session);
            setWorkLogs([...workLogs, session]);
            setShowStartWorkModal(false);
          },
          (error) => {
            const startLocation = { error: 'Location not available' };
            // Start work session even without location
            const session = {
              id: Date.now(),
              employeeId: currentUser.id,
              employeeName: currentUser.name,
              startTime: new Date().toISOString(),
              startLocation: startLocation,
              workingSite: workingSites.find(s => s.id === parseInt(selectedWorkingSite)),
              vehicle: vehicles.find(v => v.id === parseInt(selectedVehicle)),
              machine: machines.find(m => m.id === parseInt(selectedMachine)),
              kilometers: parseFloat(kilometers) || 0,
              workDescription: workDescription,
              screenshots: [],
              breaks: [],
              status: 'working',
              locationHistory: [startLocation]
            };
            setWorkSession(session);
            setWorkLogs([...workLogs, session]);
            setShowStartWorkModal(false);
          }
        );
      }
    };





    const takeBreak = () => {
      if (workSession) {
        const updatedSession = {
          ...workSession,
          breaks: [...workSession.breaks, {
            start: new Date().toISOString(),
            location: location
          }],
          status: 'break'
        };
        setWorkSession(updatedSession);
        updateWorkLog(updatedSession);
      }
    };

    const resumeWork = () => {
      if (workSession && workSession.breaks.length > 0) {
        const lastBreak = workSession.breaks[workSession.breaks.length - 1];
        lastBreak.end = new Date().toISOString();
        
        const updatedSession = {
          ...workSession,
          status: 'working'
        };
        setWorkSession(updatedSession);
        updateWorkLog(updatedSession);
      }
    };

    const endWork = () => {
      if (workSession) {
        setShowEndWorkModal(true);
      }
    };

    const confirmEndWork = () => {
      if (workSession) {
        const updatedSession = {
          ...workSession,
          endTime: new Date().toISOString(),
          endLocation: location,
          endKilometers: parseFloat(endKilometers) || 0,
          totalKilometers: (parseFloat(endKilometers) || 0) - (workSession.kilometers || 0),
          status: 'completed'
        };
        setWorkSession(null);
        updateWorkLog(updatedSession);
        setShowEndWorkModal(false);
        setEndKilometers('');
        setSelectedWorkingSite('');
        setSelectedVehicle('');
        setSelectedMachine('');
        setKilometers('');
        setWorkDescription('');
      }
    };

    const updateWorkLog = (session) => {
      setWorkLogs(logs => logs.map(log => 
        log.id === session.id ? session : log
      ));
    };

    const takeScreenshot = () => {
      // Simulate screenshot capture
      const screenshotData = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        location: location,
        type: 'work_progress'
      };

      if (workSession) {
        const updatedSession = {
          ...workSession,
          screenshots: [...workSession.screenshots, screenshotData]
        };
        setWorkSession(updatedSession);
        updateWorkLog(updatedSession);
      }

      setScreenshot(screenshotData);
      setTimeout(() => setScreenshot(null), 3000);
    };

    const takeWorkPhoto = () => {
      // Create a file input for photo capture
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment'; // Use back camera on mobile
      
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const photoData = {
              id: Date.now(),
              timestamp: new Date().toISOString(),
              location: location,
              employeeId: currentUser.id,
              employeeName: currentUser.name,
              workingSite: workSession?.workingSite,
              vehicle: workSession?.vehicle,
              machine: workSession?.machine,
              imageData: event.target.result,
              fileName: file.name,
              fileSize: file.size
            };

            // Add to work session if active, otherwise add to standalone photos
            if (workSession) {
              const updatedSession = {
                ...workSession,
                workPhotos: [...(workSession.workPhotos || []), photoData]
              };
              setWorkSession(updatedSession);
              updateWorkLog(updatedSession);
            } else {
              // Only add to standalone photos if not in a work session
              setWorkPhotos(prev => [...prev, photoData]);
            }

            // Show success notification
            setScreenshot({
              id: Date.now(),
              timestamp: new Date().toISOString(),
              type: 'photo_captured'
            });
            setTimeout(() => setScreenshot(null), 3000);
          };
          reader.readAsDataURL(file);
        }
      };
      
      input.click();
    };

    const getDocumentsForWorksite = (worksiteId) => {
      return projectDocuments.filter(doc => doc.worksiteId === worksiteId);
    };

    // Add location history to session and periodic update
    useEffect(() => {
      let intervalId;
      if (workSession && workSession.status === 'working') {
        intervalId = setInterval(() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const newLocation = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  timestamp: new Date().toISOString()
                };
                setWorkSession(prev => {
                  if (!prev) return prev;
                  const updatedHistory = prev.locationHistory ? [...prev.locationHistory, newLocation] : [newLocation];
                  const updated = { ...prev, locationHistory: updatedHistory };
                  updateWorkLog(updated);
                  return updated;
                });
              }
            );
          }
        }, 10 * 60 * 1000); // 10 minutes
      }
      return () => clearInterval(intervalId);
    }, [workSession]);

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b flex-shrink-0">
          <div className="px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Welcome, {currentUser.name}</h1>
            <div className="flex items-center space-x-3">
              <LanguageSelector />
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setCurrentView('login');
                  setWorkSession(null);
                  setSelectedWorkingSite('');
                  setSelectedVehicle('');
                  setSelectedMachine('');
                  setKilometers('');
                  setWorkDescription('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          {/* Status Card */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{t('workStatus')}</h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                workSession ? 
                  workSession.status === 'working' ? 'bg-green-100 text-green-800' :
                  workSession.status === 'break' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                : 'bg-gray-100 text-gray-800'
              }`}>
                {workSession ? 
                  workSession.status === 'working' ? t('working') :
                  workSession.status === 'break' ? t('onBreak') : t('idle')
                : t('notStarted')}
              </div>
            </div>

            {workSession && (
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">{t('started')}:</span> {new Date(workSession.startTime).toLocaleString()}</p>
                <p><span className="font-medium">{t('workingSite')}:</span> {workSession.workingSite?.name} - {workSession.workingSite?.location}</p>
                <p><span className="font-medium">{t('vehicle')}:</span> {workSession.vehicle?.name}</p>
                <p><span className="font-medium">{t('machine')}:</span> {workSession.machine?.name}</p>
                <p><span className="font-medium">{t('startKilometers')}:</span> {workSession.kilometers} km</p>
                {workSession.workDescription && (
                  <div>
                    <p className="font-medium">{t('workDescription')}:</p>
                    <p className="text-gray-700 bg-gray-50 p-2 rounded mt-1">{workSession.workDescription}</p>
                  </div>
                )}
                <p><span className="font-medium">{t('screenshots')}:</span> {workSession.screenshots.length}</p>
                <p><span className="font-medium">{t('workPhotos')}:</span> {workSession.workPhotos ? workSession.workPhotos.length : 0}</p>
                <p><span className="font-medium">{t('breaks')}:</span> {workSession.breaks.length}</p>
              </div>
            )}
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-2">
              <MapPin className="text-orange-500 mr-2" size={20} />
              <h3 className="font-semibold">Current Location</h3>
            </div>
            {location ? (
              location.error ? (
                <p className="text-red-500 text-sm">{location.error}</p>
              ) : (
                <p className="text-sm text-gray-600">
                  {location.latitude?.toFixed(6)}, {location.longitude?.toFixed(6)}
                </p>
              )
            ) : (
              <p className="text-gray-500 text-sm">{t('loading')}...</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!workSession ? (
              <button
                onClick={startWork}
                className="w-full bg-green-500 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-600 transition duration-200"
              >
                <Play size={20} />
                <span className="font-semibold">{t('startWork')}</span>
              </button>
            ) : (
              <>
                {workSession.status === 'working' ? (
                  <button
                    onClick={takeBreak}
                    className="w-full bg-yellow-500 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-yellow-600 transition duration-200"
                  >
                    <Pause size={20} />
                    <span className="font-semibold">{t('takeBreak')}</span>
                  </button>
                ) : (
                  <button
                    onClick={resumeWork}
                    className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition duration-200"
                  >
                    <Play size={20} />
                    <span className="font-semibold">{t('resumeWork')}</span>
                  </button>
                )}

                <button
                  onClick={takeScreenshot}
                  className="w-full bg-purple-500 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-purple-600 transition duration-200"
                >
                  <Camera size={20} />
                  <span className="font-semibold">{t('takeScreenshot')}</span>
                </button>

                <button
                  onClick={takeWorkPhoto}
                  className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition duration-200"
                >
                  <Camera size={20} />
                  <span className="font-semibold">{t('takeWorkPhoto')}</span>
                </button>

                <button
                  onClick={endWork}
                  className="w-full bg-red-500 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition duration-200"
                >
                  <Square size={20} />
                  <span className="font-semibold">{t('endWork')}</span>
                </button>
              </>
            )}
          </div>
        </div>







        {/* End Work Kilometers Modal */}
        {showEndWorkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">{t('endWorkVehicleKilometers')}</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">{t('workingSite')}:</span> {workSession?.workingSite?.name} - {workSession?.workingSite?.location}
                  </p>
                  <p className="text-sm text-blue-800 mt-1">
                    <span className="font-medium">{t('startKilometersLabel')}:</span> {workSession?.kilometers || 0} km
                  </p>
                  <p className="text-sm text-blue-800 mt-1">
                    <span className="font-medium">{t('vehicle')}:</span> {workSession?.vehicle?.name} ({workSession?.vehicle?.plate})
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('endKilometers')}</label>
                  <input
                    type="number"
                    value={endKilometers}
                    onChange={(e) => setEndKilometers(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={t('enterFinalOdometer')}
                    min={workSession?.kilometers || 0}
                    step="0.1"
                  />
                  {endKilometers && workSession?.kilometers && (
                    <p className="text-xs text-gray-600 mt-1">
                      {t('distanceTraveled')}: {(parseFloat(endKilometers) - workSession.kilometers).toFixed(1)} km
                    </p>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowEndWorkModal(false);
                      setEndKilometers('');
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={confirmEndWork}
                    disabled={!endKilometers || parseFloat(endKilometers) < (workSession?.kilometers || 0)}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {t('endWork')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comprehensive Start Work Modal */}
        {showStartWorkModal && (
          <div 
            key="start-work-modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              // Only close if clicking the backdrop, not the modal content
              if (e.target === e.currentTarget) {
                e.preventDefault();
                e.stopPropagation();
                setShowStartWorkModal(false);
              }
            }}
          >
            <div 
              className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <h3 className="text-lg font-semibold mb-4">{t('startWork')}</h3>
              
              <div className="space-y-4">
                {/* Working Site Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('selectWorkingSite')}</label>
                  <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
                    {workingSites.map((site) => (
                      <div
                        key={site.id}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Setting selectedWorkingSite to:', site.id);
                          setSelectedWorkingSite(site.id);
                        }}
                        className={`p-3 rounded-lg border-2 transition-all text-left cursor-pointer ${
                          selectedWorkingSite === site.id 
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                        }`}
                      >
                        <div className="font-semibold">{site.name}</div>
                        <div className="text-sm text-gray-600">{site.location}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vehicle Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('vehicle')}</label>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">{t('selectVehicle')}</option>
                    {vehicles.map(vehicle => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.name} ({vehicle.plate})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Machine Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('machineUsed')}</label>
                  <select
                    value={selectedMachine}
                    onChange={(e) => setSelectedMachine(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">{t('selectMachine')}</option>
                    {machines.map(machine => (
                      <option key={machine.id} value={machine.id}>
                        {machine.name} ({machine.type})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Start Kilometers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('startKilometersLabel')}</label>
                  <input
                    type="number"
                    value={kilometers}
                    onChange={(e) => setKilometers(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={t('enterKilometers')}
                    min="0"
                    step="0.1"
                  />
                </div>

                {/* Work Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('workDescription')}</label>
                  <textarea
                    value={workDescription}
                    onChange={(e) => setWorkDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={t('describeWork')}
                    rows="3"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowStartWorkModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={confirmStartWork}
                    disabled={!selectedWorkingSite || !selectedVehicle || !selectedMachine}
                    className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {t('startWork')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Documents Section */}
        {workSession && workSession.workingSite && (
          <div className="bg-white rounded-lg shadow p-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <FileText className="text-blue-500 mr-2" size={20} />
                {t('projectDocuments')}
              </h3>
            </div>
            
            {(() => {
              const siteDocuments = getDocumentsForWorksite(workSession.workingSite.id);
              return siteDocuments.length > 0 ? (
                <div className="space-y-3">
                  {siteDocuments.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          {doc.description && (
                            <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>{doc.category}</span>
                            <span>{new Date(doc.date).toLocaleDateString()}</span>
                            <span>{doc.fileName}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => window.open(doc.fileUrl, '_blank')}
                          className="ml-3 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                        >
                          {t('viewDocument')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">{t('noDocuments')}</p>
              );
            })()}
          </div>
        )}

        {/* Screenshot/Photo Notification */}
        {screenshot && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            <div className="flex items-center space-x-2">
              <Camera size={16} />
              <span>
                {screenshot.type === 'photo_captured' ? t('workPhotoCaptured') : t('takeScreenshot')}!
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Admin Dashboard Component
  const AdminDashboard = () => {
    const handleDocumentFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('File selected:', file.name, file.size);
        setNewDocument(prev => ({ ...prev, file }));
      } else {
        console.log('No file selected');
      }
    };

    const handleAddDocument = () => {
      console.log('Adding document:', newDocument);
      if (!newDocument.name || !newDocument.worksiteId || !newDocument.file) {
        console.log('Missing fields:', {
          name: newDocument.name,
          worksiteId: newDocument.worksiteId,
          file: newDocument.file
        });
        alert('Please fill all required fields');
        return;
      }

      const document = {
        id: Date.now(),
        name: newDocument.name,
        description: newDocument.description,
        worksiteId: parseInt(newDocument.worksiteId),
        category: newDocument.category,
        date: newDocument.date,
        fileName: newDocument.file.name,
        fileSize: newDocument.file.size,
        fileUrl: URL.createObjectURL(newDocument.file),
        uploadedBy: 'Admin',
        uploadedAt: new Date().toISOString()
      };

      setProjectDocuments(prev => {
        const updated = [...prev, document];
        console.log('Updated project documents:', updated);
        return updated;
      });
      setNewDocument({
        name: '',
        description: '',
        worksiteId: '',
        file: null,
        category: '',
        date: new Date().toISOString().slice(0, 10)
      });
      setShowAddDocumentModal(false);
      alert(`Document "${document.name}" added successfully!`);
    };

    const calculateWorkHours = (log) => {
      if (!log.startTime || !log.endTime) return 0;
      
      const start = new Date(log.startTime);
      const end = new Date(log.endTime);
      const totalMs = end - start;
      
      // Subtract break time
      const breakMs = log.breaks.reduce((total, breakItem) => {
        if (breakItem.start && breakItem.end) {
          const breakStart = new Date(breakItem.start);
          const breakEnd = new Date(breakItem.end);
          return total + (breakEnd - breakStart);
        }
        return total;
      }, 0);
      
      return Math.max(0, (totalMs - breakMs) / (1000 * 60 * 60)); // Convert to hours
    };

    const getTotalHoursThisMonth = (employeeId) => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      return workLogs
        .filter(log => {
          const logDate = new Date(log.startTime);
          return log.employeeId === employeeId && 
                 logDate.getMonth() === currentMonth && 
                 logDate.getFullYear() === currentYear &&
                 log.status === 'completed';
        })
        .reduce((total, log) => total + calculateWorkHours(log), 0);
    };

    const FuelPanel = () => (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">{t('vehicleMachinePanel')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">{t('employee')}</th>
                <th className="text-left py-2">{t('workingSite')}</th>
                <th className="text-left py-2">{t('vehicle')}</th>
                <th className="text-left py-2">{t('machine')}</th>
                <th className="text-left py-2">{t('currentKilometers')}</th>
                <th className="text-left py-2">{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => {
                const activeSession = workLogs.find(log => log.employeeId === employee.id && (log.status === 'working' || log.status === 'break'));
                return (
                  <tr key={employee.id} className="border-b">
                    <td className="py-2 font-medium">{employee.name}</td>
                    <td className="py-2">{activeSession ? activeSession.workingSite?.name : '-'}</td>
                    <td className="py-2">{activeSession ? activeSession.vehicle?.name : '-'}</td>
                    <td className="py-2">{activeSession ? activeSession.machine?.name : '-'}</td>
                    <td className="py-2">{activeSession ? activeSession.kilometers : '-'}</td>
                    <td className="py-2">{activeSession ? activeSession.status : t('notWorking')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );

    const OverviewTab = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('activeWorkers')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workLogs.filter(log => log.status === 'working' || log.status === 'break').length}
                </p>
              </div>
              <Users className="text-orange-500" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('totalHoursToday')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workLogs
                    .filter(log => {
                      const today = new Date().toDateString();
                      return new Date(log.startTime).toDateString() === today;
                    })
                    .reduce((total, log) => total + calculateWorkHours(log), 0)
                    .toFixed(1)}
                </p>
              </div>
              <Clock className="text-orange-500" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('completedJobs')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workLogs.filter(log => log.status === 'completed').length}
                </p>
              </div>
              <BarChart3 className="text-orange-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">{t('recentActivity')}</h3>
          </div>
          <div className="divide-y">
            {workLogs.slice(-5).reverse().map((log, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{log.employeeName}</p>
                    <p className="text-sm text-gray-600">
                      {log.status === 'completed' ? t('completedWork') : 
                       log.status === 'working' ? t('startedWork') : t('onBreakStatus')}
                    </p>
                    {log.workDescription && (
                      <p className="text-xs text-gray-500 mt-1">{log.workDescription}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {new Date(log.startTime).toLocaleString()}
                    </p>
                    {log.status === 'completed' && (
                      <p className="text-sm font-medium text-green-600">
                        {calculateWorkHours(log).toFixed(1)}h
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    const EmployeesTab = () => {
      // Get current location for each active employee
      const getCurrentLocationForEmployee = (employeeId) => {
        const activeSession = workLogs.find(log => 
          log.employeeId === employeeId && 
          (log.status === 'working' || log.status === 'break') &&
          log.locationHistory && 
          log.locationHistory.length > 0
        );
        
        if (activeSession && activeSession.locationHistory.length > 0) {
          const lastLocation = activeSession.locationHistory[activeSession.locationHistory.length - 1];
          return lastLocation;
        }
        return null;
      };

      return (
        <div className="space-y-4">
          {employees.map(employee => {
            const currentLocation = getCurrentLocationForEmployee(employee.id);
            const activeSession = workLogs.find(log => 
              log.employeeId === employee.id && 
              (log.status === 'working' || log.status === 'break')
            );
            
            return (
              <div key={employee.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{employee.name}</h3>
                    <p className="text-gray-600">{employee.email}</p>
                    {currentLocation && currentLocation.latitude ? (
                      <div className="mt-2 flex items-center">
                        <MapPin className="text-orange-500 mr-1" size={14} />
                        <span className="text-xs text-gray-600">
                          {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">
                          ({new Date(currentLocation.timestamp).toLocaleTimeString()})
                        </span>
                      </div>
                    ) : activeSession ? (
                      <div className="mt-2 flex items-center">
                        <MapPin className="text-red-500 mr-1" size={14} />
                        <span className="text-xs text-red-500">Location unavailable</span>
                      </div>
                    ) : (
                      <div className="mt-2 flex items-center">
                        <MapPin className="text-gray-400 mr-1" size={14} />
                        <span className="text-xs text-gray-400">Not working</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-orange-500">
                      {getTotalHoursThisMonth(employee.id).toFixed(1)}h
                    </p>
                    {activeSession && (
                      <div className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                        activeSession.status === 'working' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {activeSession.status === 'working' ? 'Working' : 'On Break'}
                      </div>
                    )}
                  </div>
                </div>
            <div className="space-y-2">
              {workLogs
                .filter(log => log.employeeId === employee.id)
                .slice(-3)
                .map((log, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between text-sm border-b py-2">
                    <div className="flex-1">
                      <span>{new Date(log.startTime).toLocaleDateString()}</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        log.status === 'completed' ? 'bg-green-100 text-green-800' :
                        log.status === 'working' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {log.status === 'completed' ? `${calculateWorkHours(log).toFixed(1)}h` : log.status}
                      </span>
                      {log.workDescription && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">Work: {log.workDescription}</p>
                        </div>
                      )}
                    </div>

                    {log.locationHistory && log.locationHistory.length > 1 && (
                      <div className="mt-2">
                        <span className="block text-xs text-gray-500 mb-1">Location History:</span>
                        <ul className="text-xs text-gray-700 list-disc ml-4">
                          {log.locationHistory.map((loc, idx) => (
                            <li key={idx}>
                              {loc.latitude ? `${loc.latitude.toFixed(6)}, ${loc.longitude.toFixed(6)}` : loc.error || 'No location'} ({new Date(loc.timestamp).toLocaleTimeString()})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        );
      })}
        </div>
      );
    };

    const ReportsTab = () => (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Report</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Employee</th>
                  <th className="text-left py-2">Total Hours</th>
                  <th className="text-left py-2">Days Worked</th>
                  <th className="text-left py-2">Avg Hours/Day</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(employee => {
                  const totalHours = getTotalHoursThisMonth(employee.id);
                  const daysWorked = new Set(
                    workLogs
                      .filter(log => log.employeeId === employee.id && log.status === 'completed')
                      .map(log => new Date(log.startTime).toDateString())
                  ).size;
                  const avgHours = daysWorked > 0 ? totalHours / daysWorked : 0;
                  
                  return (
                    <tr key={employee.id} className="border-b">
                      <td className="py-2 font-medium">{employee.name}</td>
                      <td className="py-2">{totalHours.toFixed(1)}h</td>
                      <td className="py-2">{daysWorked}</td>
                      <td className="py-2">{avgHours.toFixed(1)}h</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

    const WorkHistoryTab = () => {
      const [selectedEmployee, setSelectedEmployee] = useState('all');
      const [dateFilter, setDateFilter] = useState('all');
      
      const getFilteredWorkLogs = () => {
        let filtered = workLogs.filter(log => log.status === 'completed');
        
        // Filter by employee
        if (selectedEmployee !== 'all') {
          filtered = filtered.filter(log => log.employeeId === parseInt(selectedEmployee));
        }
        
        // Filter by date
        if (dateFilter === 'today') {
          const today = new Date().toDateString();
          filtered = filtered.filter(log => new Date(log.startTime).toDateString() === today);
        } else if (dateFilter === 'week') {
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          filtered = filtered.filter(log => new Date(log.startTime) >= weekAgo);
        } else if (dateFilter === 'month') {
          const monthAgo = new Date();
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          filtered = filtered.filter(log => new Date(log.startTime) >= monthAgo);
        }
        
        return filtered.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
      };

      return (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Work History</h3>
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee:</label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Employees</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range:</label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Work History List */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Completed Work Sessions</h3>
            </div>
            <div className="divide-y">
              {getFilteredWorkLogs().map((log, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-lg">{log.employeeName}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {calculateWorkHours(log).toFixed(1)}h
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(log.startTime).toLocaleDateString()} - {new Date(log.endTime).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(log.startTime).toLocaleTimeString()} - {new Date(log.endTime).toLocaleTimeString()}
                      </p>
                      {log.workDescription && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">Work Description:</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded mt-1">{log.workDescription}</p>
                        </div>
                      )}
                      {log.vehicle && (
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Vehicle:</span> {log.vehicle.name} ({log.vehicle.plate})
                        </p>
                      )}
                      {log.machine && (
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Machine:</span> {log.machine.name} ({log.machine.type})
                        </p>
                      )}
                      {log.kilometers > 0 && (
                        <div className="text-sm text-gray-600 mt-1">
                          <p><span className="font-medium">Start Kilometers:</span> {log.kilometers} km</p>
                          {log.endKilometers && (
                            <p><span className="font-medium">End Kilometers:</span> {log.endKilometers} km</p>
                          )}
                          {log.totalKilometers && log.totalKilometers > 0 && (
                            <p><span className="font-medium">Distance Traveled:</span> {log.totalKilometers.toFixed(1)} km</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {log.breaks.length} breaks taken
                      </p>
                      {log.locationHistory && log.locationHistory.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          {log.locationHistory.length} location updates
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {getFilteredWorkLogs().length === 0 && (
                <div className="px-6 py-8 text-center text-gray-500">
                  <p>No completed work sessions found for the selected filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    // MapTab component
    const MapTab = () => {
      const [selectedWorker, setSelectedWorker] = useState(null);
      const [mapCenter, setMapCenter] = useState(null);
      const [mapZoom, setMapZoom] = useState(12);
      
      // Get all active sessions with valid location
      const activeSessions = workLogs.filter(log => (log.status === 'working' || log.status === 'break') && log.locationHistory && log.locationHistory.length > 0);
      
      // Center map on first active worker or default
      const defaultCenter = activeSessions.length > 0 && activeSessions[0].locationHistory[activeSessions[0].locationHistory.length-1].latitude
        ? {
            lat: activeSessions[0].locationHistory[activeSessions[0].locationHistory.length-1].latitude,
            lng: activeSessions[0].locationHistory[activeSessions[0].locationHistory.length-1].longitude
          }
        : { lat: 41.9981, lng: 21.4254 }; // Skopje as default

      const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
      });

      const handleMarkerClick = (worker) => {
        const lastLoc = worker.locationHistory[worker.locationHistory.length - 1];
        if (lastLoc && lastLoc.latitude) {
          setSelectedWorker(worker);
          setMapCenter({ lat: lastLoc.latitude, lng: lastLoc.longitude });
          setMapZoom(15); // Zoom in closer when clicking on worker
        }
      };

      const clearSelection = () => {
        setSelectedWorker(null);
        setMapCenter(null);
        setMapZoom(12);
      };

      return (
        <div className="space-y-4">
          {/* Worker Selection Info */}
          {selectedWorker && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-orange-600">{selectedWorker.employeeName}</h3>
                  <p className="text-sm text-gray-600">
                    Status: <span className={`font-medium ${
                      selectedWorker.status === 'working' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {selectedWorker.status === 'working' ? 'Working' : 'On Break'}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Started: {new Date(selectedWorker.startTime).toLocaleString()}
                  </p>
                  {selectedWorker.workDescription && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Work:</span> {selectedWorker.workDescription}
                    </p>
                  )}
                  {selectedWorker.vehicle && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Vehicle:</span> {selectedWorker.vehicle.name} ({selectedWorker.vehicle.plate})
                    </p>
                  )}
                  {selectedWorker.machine && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Machine:</span> {selectedWorker.machine.name} ({selectedWorker.machine.type})
                    </p>
                  )}
                </div>
                <button
                  onClick={clearSelection}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Map */}
          <div className="w-full h-[500px] bg-gray-200 rounded-lg overflow-hidden">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter || defaultCenter}
                zoom={mapZoom}
              >
                {activeSessions.map((log, idx) => {
                  const lastLoc = log.locationHistory[log.locationHistory.length-1];
                  if (!lastLoc.latitude) return null;
                  
                  // Create custom red flag icon
                  const flagIcon = {
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
                          </filter>
                        </defs>
                        <g filter="url(#shadow)">
                          <!-- Flag pole -->
                          <rect x="14" y="8" width="2" height="20" fill="#8B4513" stroke="#654321" stroke-width="0.5"/>
                          <!-- Flag -->
                          <rect x="16" y="8" width="12" height="8" fill="#FF0000" stroke="#CC0000" stroke-width="0.5"/>
                          <!-- Flag pattern -->
                          <rect x="16" y="8" width="12" height="2" fill="#FFFFFF"/>
                          <rect x="16" y="12" width="12" height="2" fill="#FFFFFF"/>
                          <!-- Pole base -->
                          <circle cx="15" cy="28" r="2" fill="#654321" stroke="#8B4513" stroke-width="0.5"/>
                        </g>
                      </svg>
                    `)}`,
                    scaledSize: { width: 32, height: 32 },
                    anchor: { x: 15, y: 28 }, // Anchor at the base of the flag pole
                    labelOrigin: { x: 15, y: 20 } // Position label above the flag
                  };
                  
                  return (
                    <Marker
                      key={log.id}
                      position={{ lat: lastLoc.latitude, lng: lastLoc.longitude }}
                      icon={flagIcon}
                      label={{
                        text: log.employeeName[0],
                        className: "marker-label",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}
                      title={`${log.employeeName} (Last update: ${new Date(lastLoc.timestamp).toLocaleTimeString()})`}
                      onClick={() => handleMarkerClick(log)}
                    />
                  );
                })}
              </GoogleMap>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-600">{t('loading')}...</div>
            )}
          </div>

          {/* Quick Worker List */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-3">{t('activeWorkersMap')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeSessions.map((worker) => {
                const lastLoc = worker.locationHistory[worker.locationHistory.length - 1];
                return (
                  <button
                    key={worker.id}
                    onClick={() => handleMarkerClick(worker)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedWorker?.id === worker.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    <div className="text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{worker.employeeName}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          worker.status === 'working' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {worker.status === 'working' ? t('working') : t('onBreak')}
                        </span>
                      </div>
                      {lastLoc && lastLoc.latitude ? (
                        <p className="text-xs text-gray-600 mt-1">
                          📍 {lastLoc.latitude.toFixed(4)}, {lastLoc.longitude.toFixed(4)}
                        </p>
                      ) : (
                        <p className="text-xs text-red-500 mt-1">📍 {t('locationUnavailable')}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {t('lastUpdate')}: {lastLoc ? new Date(lastLoc.timestamp).toLocaleTimeString() : 'Never'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            {activeSessions.length === 0 && (
              <p className="text-gray-500 text-center py-4">{t('noActiveWorkers')}</p>
            )}
          </div>
        </div>
      );
    };

    // LocationHistoryTab component
    const LocationHistoryTab = () => {
      // Filter logs by selected date
      const logsByDate = workLogs.filter(log => {
        const logDate = new Date(log.startTime).toISOString().slice(0, 10);
        return logDate === selectedDate;
      });
      return (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </div>
          {employees.map(employee => {
            const logs = logsByDate.filter(log => log.employeeId === employee.id && log.locationHistory && log.locationHistory.length > 0);
            return (
              <div key={employee.id} className="mb-6 bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold mb-2">{employee.name}</h3>
                {logs.length === 0 ? (
                  <p className="text-gray-500 text-sm">No location history for this day.</p>
                ) : (
                  logs.map((log, idx) => (
                    <div key={idx} className="mb-2">
                      <span className="block text-xs text-gray-500 mb-1">Session started: {new Date(log.startTime).toLocaleString()}</span>
                      <ul className="text-xs text-gray-700 list-disc ml-4">
                        {log.locationHistory.map((loc, i) => (
                          <li key={i}>
                            {loc.latitude ? `${loc.latitude.toFixed(6)}, ${loc.longitude.toFixed(6)}` : loc.error || 'No location'} ({new Date(loc.timestamp).toLocaleTimeString()})
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      );
    };

    // Worksite Hours Tab Component
    const WorksiteHoursTab = () => {
      const getWorksiteHours = (employeeId, worksiteId, period = 'month') => {
        const now = new Date();
        let startDate;
        
        switch(period) {
          case 'today':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
          case 'week':
            const dayOfWeek = now.getDay();
            const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysToSubtract);
            break;
          case 'month':
          default:
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        }

        return workLogs
          .filter(log => {
            const logDate = new Date(log.startTime);
            return log.employeeId === employeeId && 
                   log.workingSite?.id === worksiteId &&
                   logDate >= startDate && 
                   log.status === 'completed';
          })
          .reduce((total, log) => total + calculateWorkHours(log), 0);
      };

      const getTotalWorksiteHours = (worksiteId, period = 'month') => {
        return employees.reduce((total, employee) => {
          return total + getWorksiteHours(employee.id, worksiteId, period);
        }, 0);
      };

      return (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('today')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {workingSites.reduce((total, site) => total + getTotalWorksiteHours(site.id, 'today'), 0).toFixed(1)}h
                  </p>
                </div>
                <Clock className="text-orange-500" size={24} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('thisWeek')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {workingSites.reduce((total, site) => total + getTotalWorksiteHours(site.id, 'week'), 0).toFixed(1)}h
                  </p>
                </div>
                <Calendar className="text-orange-500" size={24} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('thisMonth')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {workingSites.reduce((total, site) => total + getTotalWorksiteHours(site.id, 'month'), 0).toFixed(1)}h
                  </p>
                </div>
                <BarChart3 className="text-orange-500" size={24} />
              </div>
            </div>
          </div>

          {/* Worksite Hours Breakdown */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">{t('worksiteHours')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('workingSite')}</th>
                    {employees.map(employee => (
                      <th key={employee.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {employee.name}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('totalHours')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workingSites.map(site => (
                    <tr key={site.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{site.name}</div>
                          <div className="text-sm text-gray-500">{site.location}</div>
                        </div>
                      </td>
                      {employees.map(employee => (
                        <td key={employee.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getWorksiteHours(employee.id, site.id, 'month').toFixed(1)}h
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {getTotalWorksiteHours(site.id, 'month').toFixed(1)}h
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };

    // Materials Tab Component
    const MaterialsTab = () => {
      const handleAddMaterial = () => {
        if (newMaterial.name && newMaterial.type && newMaterial.quantity && newMaterial.unit && newMaterial.cost) {
          const material = {
            id: Date.now(),
            ...newMaterial,
            cost: parseFloat(newMaterial.cost),
            quantity: parseFloat(newMaterial.quantity),
            date: newMaterial.date
          };
          setMaterials([...materials, material]);
          setNewMaterial({
            name: '',
            type: '',
            quantity: '',
            unit: '',
            cost: '',
            date: new Date().toISOString().slice(0, 10)
          });
          setShowAddMaterialModal(false);
        }
      };

      const getMaterialTypeName = (typeId) => {
        const type = materialTypes.find(t => t.id === typeId);
        return type ? t(type.id) : typeId;
      };

      const getMaterialUnitName = (unitId) => {
        const unit = materialUnits.find(u => u.id === unitId);
        return unit ? t(unit.id) : unitId;
      };

      const getTotalCost = () => {
        return materials.reduce((total, material) => total + material.cost, 0);
      };

      const getMaterialsByDate = (date) => {
        return materials.filter(material => material.date === date);
      };

      const getUniqueDates = () => {
        return [...new Set(materials.map(material => material.date))].sort().reverse();
      };

      return (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('totalMaterials')}</p>
                  <p className="text-2xl font-bold text-gray-900">{materials.length}</p>
                </div>
                <BarChart3 className="text-orange-500" size={24} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('totalCost')}</p>
                  <p className="text-2xl font-bold text-gray-900">€{getTotalCost().toFixed(2)}</p>
                </div>
                <DollarSign className="text-orange-500" size={24} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('today')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {getMaterialsByDate(new Date().toISOString().slice(0, 10)).length}
                  </p>
                </div>
                <Calendar className="text-orange-500" size={24} />
              </div>
            </div>
          </div>

          {/* Add Material Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddMaterialModal(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>{t('addMaterial')}</span>
            </button>
          </div>

          {/* Materials List */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">{t('materialsUsed')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('materialName')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('materialType')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('quantity')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('unit')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('cost')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {materials.sort((a, b) => new Date(b.date) - new Date(a.date)).map(material => (
                    <tr key={material.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(material.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {material.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getMaterialTypeName(material.type)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {material.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getMaterialUnitName(material.unit)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        €{material.cost.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };

    // Work Photos Tab Component
    const WorkPhotosTab = () => {
      const [selectedPhoto, setSelectedPhoto] = useState(null);
      const [showPhotoModal, setShowPhotoModal] = useState(false);

      const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
        setShowPhotoModal(true);
      };

      const getFilteredPhotos = () => {
        // Get all photos from work sessions and standalone photos
        const sessionPhotos = workLogs
          .filter(log => log.workPhotos && log.workPhotos.length > 0)
          .flatMap(log => log.workPhotos);
        
        return [...workPhotos, ...sessionPhotos].sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        );
      };

      return (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('totalPhotos')}</p>
                  <p className="text-2xl font-bold text-gray-900">{getFilteredPhotos().length}</p>
                </div>
                <Camera className="text-orange-500" size={24} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('today')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {getFilteredPhotos().filter(photo => {
                      const photoDate = new Date(photo.timestamp).toDateString();
                      return photoDate === new Date().toDateString();
                    }).length}
                  </p>
                </div>
                <Calendar className="text-orange-500" size={24} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('thisWeek')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {getFilteredPhotos().filter(photo => {
                      const photoDate = new Date(photo.timestamp);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return photoDate >= weekAgo;
                    }).length}
                  </p>
                </div>
                <BarChart3 className="text-orange-500" size={24} />
              </div>
            </div>
          </div>

          {/* Photos Grid */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">{t('workPhotos')}</h3>
            </div>
            <div className="p-6">
              {getFilteredPhotos().length === 0 ? (
                <div className="text-center py-8">
                  <Camera className="mx-auto text-gray-400" size={48} />
                  <p className="text-gray-500 mt-2">{t('noWorkPhotos')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFilteredPhotos().map(photo => (
                    <div 
                      key={photo.id} 
                      className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handlePhotoClick(photo)}
                    >
                      <img 
                        src={photo.imageData} 
                        alt="Work Photo" 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3">
                        <p className="font-medium text-sm">{photo.employeeName}</p>
                        <p className="text-xs text-gray-600">
                          {new Date(photo.timestamp).toLocaleString()}
                        </p>
                        {photo.workingSite && (
                          <p className="text-xs text-gray-500 mt-1">
                            {photo.workingSite.name} - {photo.workingSite.location}
                          </p>
                        )}
                        {photo.vehicle && (
                          <p className="text-xs text-gray-500">
                            {t('vehicle')}: {photo.vehicle.name}
                          </p>
                        )}
                        {photo.machine && (
                          <p className="text-xs text-gray-500">
                            {t('machine')}: {photo.machine.name}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Photo Modal */}
          {showPhotoModal && selectedPhoto && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{t('workPhotoDetails')}</h3>
                    <button
                      onClick={() => setShowPhotoModal(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <span className="text-2xl">&times;</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src={selectedPhoto.imageData} 
                        alt="Work Photo" 
                        className="w-full rounded-lg shadow-lg"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{t('photoDetails')}</h4>
                        <div className="mt-2 space-y-2 text-sm">
                          <p><span className="font-medium">{t('employee')}:</span> {selectedPhoto.employeeName}</p>
                          <p><span className="font-medium">{t('date')}:</span> {new Date(selectedPhoto.timestamp).toLocaleString()}</p>
                          <p><span className="font-medium">{t('fileName')}:</span> {selectedPhoto.fileName}</p>
                          <p><span className="font-medium">{t('fileSize')}:</span> {(selectedPhoto.fileSize / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>

                      {selectedPhoto.workingSite && (
                        <div>
                          <h4 className="font-medium text-gray-900">{t('workDetails')}</h4>
                          <div className="mt-2 space-y-2 text-sm">
                            <p><span className="font-medium">{t('workingSite')}:</span> {selectedPhoto.workingSite.name}</p>
                            <p><span className="font-medium">{t('location')}:</span> {selectedPhoto.workingSite.location}</p>
                            {selectedPhoto.vehicle && (
                              <p><span className="font-medium">{t('vehicle')}:</span> {selectedPhoto.vehicle.name} ({selectedPhoto.vehicle.plate})</p>
                            )}
                            {selectedPhoto.machine && (
                              <p><span className="font-medium">{t('machine')}:</span> {selectedPhoto.machine.name} ({selectedPhoto.machine.type})</p>
                            )}
                          </div>
                        </div>
                      )}

                      {selectedPhoto.location && selectedPhoto.location.latitude && (
                        <div>
                          <h4 className="font-medium text-gray-900">{t('location')}</h4>
                          <div className="mt-2 text-sm">
                            <p><span className="font-medium">{t('coordinates')}:</span> {selectedPhoto.location.latitude.toFixed(6)}, {selectedPhoto.location.longitude.toFixed(6)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

    // Project Documents Tab Component
    const ProjectDocumentsTab = () => {
      const [selectedDocument, setSelectedDocument] = useState(null);
      const [showDocumentModal, setShowDocumentModal] = useState(false);

      const handleDocumentClick = (document) => {
        setSelectedDocument(document);
        setShowDocumentModal(true);
      };

      const getDocumentsByCategory = () => {
        const categories = {};
        projectDocuments.forEach(doc => {
          if (!categories[doc.category]) {
            categories[doc.category] = [];
          }
          categories[doc.category].push(doc);
        });
        return categories;
      };

      const getCategoryName = (categoryId) => {
        const category = documentCategories.find(cat => cat.id === categoryId);
        return category ? category.name : categoryId;
      };

      return (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('totalDocuments')}</p>
                  <p className="text-2xl font-bold text-gray-900">{projectDocuments.length}</p>
                </div>
                <FileText className="text-orange-500" size={24} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('materials')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Object.keys(getDocumentsByCategory()).length}
                  </p>
                </div>
                <Folder className="text-orange-500" size={24} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('workingSite')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(projectDocuments.map(doc => doc.worksiteId)).size}
                  </p>
                </div>
                <MapPin className="text-orange-500" size={24} />
              </div>
            </div>
          </div>

          {/* Add Document Button */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t('projectDocuments')}</h3>
              <button
                onClick={() => setShowAddDocumentModal(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>{t('addDocument')}</span>
              </button>
            </div>
          </div>

          {/* Documents by Category */}
          <div className="space-y-6">
            {Object.entries(getDocumentsByCategory()).map(([category, documents]) => (
              <div key={category} className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold">{getCategoryName(category)}</h3>
                  <p className="text-sm text-gray-600">{documents.length} documents</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map(doc => (
                      <div 
                        key={doc.id} 
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleDocumentClick(doc)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(doc.fileUrl, '_blank');
                            }}
                            className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                          >
                            View
                          </button>
                        </div>
                        {doc.description && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{doc.description}</p>
                        )}
                        <div className="space-y-1 text-xs text-gray-500">
                          <p><span className="font-medium">Worksite:</span> {workingSites.find(s => s.id === doc.worksiteId)?.name}</p>
                          <p><span className="font-medium">Date:</span> {new Date(doc.date).toLocaleDateString()}</p>
                          <p><span className="font-medium">File:</span> {doc.fileName}</p>
                          <p><span className="font-medium">Size:</span> {(doc.fileSize / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Document Modal */}
          {showDocumentModal && selectedDocument && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Document Details</h3>
                    <button
                      onClick={() => setShowDocumentModal(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <span className="text-2xl">&times;</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Document Information</h4>
                      <div className="mt-2 space-y-2 text-sm">
                        <p><span className="font-medium">Name:</span> {selectedDocument.name}</p>
                        <p><span className="font-medium">Category:</span> {getCategoryName(selectedDocument.category)}</p>
                        <p><span className="font-medium">Worksite:</span> {workingSites.find(s => s.id === selectedDocument.worksiteId)?.name}</p>
                        <p><span className="font-medium">Date:</span> {new Date(selectedDocument.date).toLocaleDateString()}</p>
                        <p><span className="font-medium">Uploaded by:</span> {selectedDocument.uploadedBy}</p>
                        <p><span className="font-medium">Uploaded at:</span> {new Date(selectedDocument.uploadedAt).toLocaleString()}</p>
                      </div>
                    </div>

                    {selectedDocument.description && (
                      <div>
                        <h4 className="font-medium text-gray-900">Description</h4>
                        <p className="mt-2 text-sm text-gray-600">{selectedDocument.description}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium text-gray-900">File Information</h4>
                      <div className="mt-2 space-y-2 text-sm">
                        <p><span className="font-medium">File name:</span> {selectedDocument.fileName}</p>
                        <p><span className="font-medium">File size:</span> {(selectedDocument.fileSize / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        onClick={() => window.open(selectedDocument.fileUrl, '_blank')}
                        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        View Document
                      </button>
                      <button
                        onClick={() => setShowDocumentModal(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

        return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b flex-shrink-0">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{t('adminDashboard')}</h1>
            <div className="flex items-center space-x-3">
              <LanguageSelector />
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setCurrentView('login');
                  setSelectedWorkingSite('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Fuel Panel */}
        <div className="flex-shrink-0">
          <FuelPanel />
        </div>

        {/* Tabs */}
        <div className="bg-white border-b flex-shrink-0">
          <div className="px-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {[
                { id: 'overview', label: t('overview'), icon: BarChart3 },
                { id: 'employees', label: t('employees'), icon: Users },
                { id: 'reports', label: t('reports'), icon: Calendar },
                { id: 'workHistory', label: t('workHistory'), icon: Calendar },
                { id: 'map', label: t('map'), icon: MapPin },
                { id: 'locationHistory', label: t('locationHistory'), icon: MapPin },
                { id: 'worksiteHours', label: t('worksiteHours'), icon: Clock },
                { id: 'materials', label: t('materials'), icon: BarChart3 },
                { id: 'workPhotos', label: t('workPhotos'), icon: Camera },
                { id: 'projectDocuments', label: t('projectDocuments'), icon: FileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'employees' && <EmployeesTab />}
          {activeTab === 'reports' && <ReportsTab />}
          {activeTab === 'workHistory' && <WorkHistoryTab />}
          {activeTab === 'map' && <MapTab />}
          {activeTab === 'locationHistory' && <LocationHistoryTab />}
          {activeTab === 'worksiteHours' && <WorksiteHoursTab />}
          {activeTab === 'materials' && <MaterialsTab />}
          {activeTab === 'workPhotos' && <WorkPhotosTab />}
          {activeTab === 'projectDocuments' && <ProjectDocumentsTab />}
        </div>

        {/* Add Material Modal */}
        {showAddMaterialModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">{t('addMaterial')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('materialName')}</label>
                  <input
                    type="text"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter material name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('materialType')}</label>
                  <select
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">{t('selectMaterialType')}</option>
                    {materialTypes.map(type => (
                      <option key={type.id} value={type.id}>{t(type.id)}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('quantity')}</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newMaterial.quantity}
                      onChange={(e) => setNewMaterial({...newMaterial, quantity: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('unit')}</label>
                    <select
                      value={newMaterial.unit}
                      onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">{t('selectUnit')}</option>
                      {materialUnits.map(unit => (
                        <option key={unit.id} value={unit.id}>{t(unit.id)}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('cost')} (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newMaterial.cost}
                    onChange={(e) => setNewMaterial({...newMaterial, cost: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('date')}</label>
                  <input
                    type="date"
                    value={newMaterial.date}
                    onChange={(e) => setNewMaterial({...newMaterial, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      const material = {
                        id: Date.now(),
                        ...newMaterial,
                        cost: parseFloat(newMaterial.cost),
                        quantity: parseFloat(newMaterial.quantity),
                        date: newMaterial.date
                      };
                      setMaterials([...materials, material]);
                      setNewMaterial({
                        name: '',
                        type: '',
                        quantity: '',
                        unit: '',
                        cost: '',
                        date: new Date().toISOString().slice(0, 10)
                      });
                      setShowAddMaterialModal(false);
                    }}
                    className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
                  >
                    {t('addMaterial')}
                  </button>
                  <button
                    onClick={() => setShowAddMaterialModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Document Modal */}
        {showAddDocumentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">{t('addDocument')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('documentName')}</label>
                  <input
                    type="text"
                    value={newDocument.name}
                    onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={t('documentName')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('documentDescription')}</label>
                  <textarea
                    value={newDocument.description}
                    onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={t('documentDescription')}
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('workingSite')}</label>
                  <select
                    value={newDocument.worksiteId}
                    onChange={(e) => setNewDocument({...newDocument, worksiteId: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">{t('selectWorksite')}</option>
                    {workingSites.map(site => (
                      <option key={site.id} value={site.id}>{site.name} - {site.location}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('documentCategory')}</label>
                  <select
                    value={newDocument.category}
                    onChange={(e) => setNewDocument({...newDocument, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">{t('selectCategory')}</option>
                    {documentCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('date')}</label>
                  <input
                    type="date"
                    value={newDocument.date}
                    onChange={(e) => setNewDocument({...newDocument, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('documentFile')}</label>
                  <input
                    type="file"
                    onChange={handleDocumentFileChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  />
                  {newDocument.file && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">Selected file:</span> {newDocument.file.name}
                      </p>
                      <p className="text-xs text-green-600">
                        Size: {(newDocument.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{t('supportedFormats')}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddDocument}
                    className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
                  >
                    {t('addDocument')}
                  </button>
                  <button
                    onClick={() => setShowAddDocumentModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Main render
  if (currentView === 'splash') {
    return <SplashScreen />;
  }

  if (currentView === 'login') {
    return <LoginForm />;
  }

  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  if (currentView === 'employee') {
    return <EmployeeDashboard />;
  }

  return null;
};

export default EmployeeTrackingApp;