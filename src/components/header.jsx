"use client"

import { useState, useEffect } from "react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState("")
  const [notifications, setNotifications] = useState([])
  const [currentView, setCurrentView] = useState("dashboard")
  const [showSuperAdminPanel, setShowSuperAdminPanel] = useState(false)

  // Simulate getting user data from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("userData")
    if (token && userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setUserRole(parsedUser.role || "")

      if (parsedUser.role === "SuperAdmin") {
        setNotifications([
          { id: 1, message: "Yangi o'quvchi ro'yxatdan o'tdi", type: "info" },
          { id: 2, message: "To'lov kutilmoqda", type: "warning" },
          { id: 3, message: "Tizim yangilanishi mavjud", type: "success" },
        ])
      }
    }

    if (window.location.pathname.includes("superadmin") || window.location.hash.includes("superadmin")) {
      setShowSuperAdminPanel(true)
      setUserRole("SuperAdmin")
      setUser({ name: "SuperAdmin", email: "admin@system.com", role: "SuperAdmin" })
    }
  }, [])

  const [dashboardData, setDashboardData] = useState({
    totalStudents: 1250,
    totalTeachers: 45,
    totalCourses: 28,
    totalPayments: 125000,
    monthlyRevenue: 45000,
    activeGroups: 32,
    pendingPayments: 15,
    systemHealth: 98,
  })

  const [students, setStudents] = useState([
    { id: 1, name: "Ali Valiyev", course: "Frontend", group: "FE-01", payment: "To'langan", phone: "+998901234567" },
    {
      id: 2,
      name: "Malika Karimova",
      course: "Backend",
      group: "BE-02",
      payment: "Kutilmoqda",
      phone: "+998907654321",
    },
    { id: 3, name: "Bobur Toshmatov", course: "Mobile", group: "MB-01", payment: "To'langan", phone: "+998909876543" },
  ])

  const [courses, setCourses] = useState([
    { id: 1, name: "Frontend Development", duration: "6 oy", price: 800000, students: 45, teacher: "Jasur Abdullayev" },
    { id: 2, name: "Backend Development", duration: "8 oy", price: 1000000, students: 38, teacher: "Nodira Karimova" },
    { id: 3, name: "Mobile Development", duration: "7 oy", price: 900000, students: 32, teacher: "Sardor Rahimov" },
  ])

  const [payments, setPayments] = useState([
    { id: 1, student: "Ali Valiyev", amount: 800000, date: "2024-01-15", status: "To'langan", method: "Naqd" },
    { id: 2, student: "Malika Karimova", amount: 1000000, date: "2024-01-10", status: "Kutilmoqda", method: "Karta" },
    { id: 3, student: "Bobur Toshmatov", amount: 900000, date: "2024-01-12", status: "To'langan", method: "Bank" },
  ])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
    setUser(null)
    setUserRole("")
    setShowSuperAdminPanel(false)
    window.location.href = "/login"
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const renderSuperAdminPanel = () => {
    if (!showSuperAdminPanel || userRole !== "SuperAdmin") return null

    switch (currentView) {
      case "dashboard":
        return (
          <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">SuperAdmin Dashboard</h1>
                <p className="text-gray-600">O'quv markazi boshqaruv paneli</p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Jami O'quvchilar</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardData.totalStudents}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <span className="text-2xl">🎓</span>
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-2">↗ +12% bu oyda</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">O'qituvchilar</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardData.totalTeachers}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <span className="text-2xl">👨‍🏫</span>
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-2">↗ +3 yangi</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Kurslar</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardData.totalCourses}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <span className="text-2xl">📚</span>
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-2">↗ +2 yangi kurs</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Oylik Daromad</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {dashboardData.monthlyRevenue.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <span className="text-2xl">💰</span>
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-2">↗ +8% o'sish</p>
                </div>
              </div>

              {/* Charts and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Oylik Statistika</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl mb-2 block">📊</span>
                      <p className="text-gray-600">Chart komponenti bu yerda bo'ladi</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">So'nggi Faoliyat</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <span className="text-xl">👤</span>
                      <div>
                        <p className="text-sm font-medium">Yangi o'quvchi qo'shildi</p>
                        <p className="text-xs text-gray-500">5 daqiqa oldin</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <span className="text-xl">💰</span>
                      <div>
                        <p className="text-sm font-medium">To'lov qabul qilindi</p>
                        <p className="text-xs text-gray-500">15 daqiqa oldin</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <span className="text-xl">📚</span>
                      <div>
                        <p className="text-sm font-medium">Yangi kurs yaratildi</p>
                        <p className="text-xs text-gray-500">1 soat oldin</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tezkor Amallar</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => setCurrentView("students")}
                    className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
                  >
                    <span className="text-2xl block mb-2">👥</span>
                    <span className="text-sm font-medium">O'quvchilar</span>
                  </button>
                  <button
                    onClick={() => setCurrentView("courses")}
                    className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors"
                  >
                    <span className="text-2xl block mb-2">📚</span>
                    <span className="text-sm font-medium">Kurslar</span>
                  </button>
                  <button
                    onClick={() => setCurrentView("payments")}
                    className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-center transition-colors"
                  >
                    <span className="text-2xl block mb-2">💰</span>
                    <span className="text-sm font-medium">To'lovlar</span>
                  </button>
                  <button
                    onClick={() => setCurrentView("settings")}
                    className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors"
                  >
                    <span className="text-2xl block mb-2">⚙️</span>
                    <span className="text-sm font-medium">Sozlamalar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case "students":
        return (
          <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">O'quvchilar Boshqaruvi</h1>
                  <p className="text-gray-600">Barcha o'quvchilar ro'yxati va boshqaruv</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                  + Yangi O'quvchi
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="O'quvchi qidirish..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Barcha kurslar</option>
                      <option>Frontend</option>
                      <option>Backend</option>
                      <option>Mobile</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          O'quvchi
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kurs
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Guruh
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          To'lov
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Telefon
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amallar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                {student.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.group}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                student.payment === "To'langan"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {student.payment}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Tahrirlash</button>
                            <button className="text-red-600 hover:text-red-900">O'chirish</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )

      case "courses":
        return (
          <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Kurslar Boshqaruvi</h1>
                  <p className="text-gray-600">Barcha kurslar va ularning ma'lumotlari</p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                  + Yangi Kurs
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {course.duration}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Narx:</span>
                        <span className="font-medium">{course.price.toLocaleString()} so'm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">O'quvchilar:</span>
                        <span className="font-medium">{course.students} ta</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">O'qituvchi:</span>
                        <span className="font-medium">{course.teacher}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                        Tahrirlash
                      </button>
                      <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                        Ko'rish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "payments":
        return (
          <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">To'lovlar Boshqaruvi</h1>
                  <p className="text-gray-600">Barcha to'lovlar va moliyaviy hisobotlar</p>
                </div>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium">
                  + Yangi To'lov
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Jami To'lovlar</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData.totalPayments.toLocaleString()}</p>
                    </div>
                    <span className="text-3xl">💰</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Kutilayotgan</p>
                      <p className="text-2xl font-bold text-red-600">{dashboardData.pendingPayments}</p>
                    </div>
                    <span className="text-3xl">⏳</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Bu Oy</p>
                      <p className="text-2xl font-bold text-green-600">
                        {dashboardData.monthlyRevenue.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-3xl">📈</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          O'quvchi
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Miqdor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sana
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Holat
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usul
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amallar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {payment.student}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {payment.amount.toLocaleString()} so'm
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                payment.status === "To'langan"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.method}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Ko'rish</button>
                            <button className="text-green-600 hover:text-green-900">Tasdiqlash</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )

      case "settings":
        return (
          <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Tizim Sozlamalari</h1>
                <p className="text-gray-600">O'quv markazi tizimi sozlamalari</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Umumiy Sozlamalar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Markaz Nomi</label>
                      <input
                        type="text"
                        defaultValue="O'quv Markazi"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                      <input
                        type="text"
                        defaultValue="+998 90 123 45 67"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="info@oquvmarkazi.uz"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manzil</label>
                      <input
                        type="text"
                        defaultValue="Toshkent, Chilonzor tumani"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">To'lov Sozlamalari</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Chegirma foizi</label>
                      <input
                        type="number"
                        defaultValue="10"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kechikish jarima (%)</label>
                      <input
                        type="number"
                        defaultValue="5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tizim Holati</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl mb-2">✅</div>
                      <div className="text-sm font-medium text-gray-900">Server Holati</div>
                      <div className="text-xs text-green-600">Ishlayapti</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl mb-2">💾</div>
                      <div className="text-sm font-medium text-gray-900">Ma'lumotlar Bazasi</div>
                      <div className="text-xs text-blue-600">98% to'lgan</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl mb-2">🔄</div>
                      <div className="text-sm font-medium text-gray-900">Backup</div>
                      <div className="text-xs text-yellow-600">Kunlik</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                    Saqlash
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const getNavigationItems = () => {
    if (showSuperAdminPanel && userRole === "SuperAdmin") {
      return [
        { name: "Dashboard", href: "#", icon: "📊", action: () => setCurrentView("dashboard") },
        { name: "O'quvchilar", href: "#", icon: "👥", action: () => setCurrentView("students") },
        { name: "Kurslar", href: "#", icon: "📚", action: () => setCurrentView("courses") },
        { name: "To'lovlar", href: "#", icon: "💰", action: () => setCurrentView("payments") },
        { name: "Sozlamalar", href: "#", icon: "⚙️", action: () => setCurrentView("settings") },
      ]
    }

    const publicItems = [
      { name: "Bosh sahifa", href: "/", icon: "🏠" },
      { name: "Kategoriyalar", href: "/categories", icon: "📂" },
      { name: "Ovqatlar", href: "/foods", icon: "🍽️" },
      { name: "Stol bron qilish", href: "/book-table", icon: "🪑" },
      { name: "Aloqa", href: "/contact", icon: "📞" },
      { name: "Izohlar", href: "/comments", icon: "💬" },
    ]

    const roleBasedItems = {
      SuperAdmin: [
        { name: "Dashboard", href: "/admin/dashboard", icon: "📊", badge: "Asosiy" },
        { name: "Foydalanuvchilar", href: "/admin/users", icon: "👥", badge: "Boshqaruv" },
        { name: "Kurslar", href: "/admin/courses", icon: "📚", badge: "Ta'lim" },
        { name: "Guruhlar", href: "/admin/groups", icon: "👨‍🎓", badge: "Ta'lim" },
        { name: "O'qituvchilar", href: "/admin/teachers", icon: "👨‍🏫", badge: "Kadrlar" },
        { name: "O'quvchilar", href: "/admin/students", icon: "🎓", badge: "Ta'lim" },
        { name: "Dars jadvali", href: "/admin/schedule", icon: "📅", badge: "Jadval" },
        { name: "Davomat", href: "/admin/attendance", icon: "✅", badge: "Nazorat" },
        { name: "Imtihonlar", href: "/admin/exams", icon: "📝", badge: "Baholash" },
        { name: "Baholar", href: "/admin/grades", icon: "🎯", badge: "Baholash" },
        { name: "To'lovlar", href: "/admin/payments", icon: "💰", badge: "Moliya" },
        { name: "Hisobotlar", href: "/admin/reports", icon: "📈", badge: "Tahlil" },
        { name: "Xabarlar", href: "/admin/messages", icon: "📨", badge: "Aloqa" },
        { name: "Vazifalar", href: "/admin/assignments", icon: "📋", badge: "Ta'lim" },
        { name: "Kategoriyalar", href: "/admin/categories", icon: "📂", badge: "Kontent" },
        { name: "Ovqatlar", href: "/admin/foods", icon: "🍽️", badge: "Kontent" },
        { name: "Izohlar", href: "/admin/comments", icon: "💬", badge: "Moderatsiya" },
        { name: "Bronlar", href: "/admin/bookings", icon: "🪑", badge: "Xizmat" },
        { name: "Kontaktlar", href: "/admin/contacts", icon: "📞", badge: "Aloqa" },
        { name: "Tizim sozlamalari", href: "/admin/settings", icon: "⚙️", badge: "Sozlash" },
        { name: "Backup", href: "/admin/backup", icon: "💾", badge: "Xavfsizlik" },
        { name: "Loglar", href: "/admin/logs", icon: "📄", badge: "Monitoring" },
      ],
      Admin: [
        { name: "Dashboard", href: "/admin/dashboard", icon: "📊" },
        { name: "Kategoriyalar Admin", href: "/admin/categories", icon: "📂" },
        { name: "Ovqatlar Admin", href: "/admin/foods", icon: "🍽️" },
        { name: "Izohlar Admin", href: "/admin/comments", icon: "💬" },
        { name: "Bronlar Admin", href: "/admin/bookings", icon: "🪑" },
        { name: "Kontaktlar Admin", href: "/admin/contacts", icon: "📞" },
        { name: "O'quvchilar", href: "/admin/students", icon: "👨‍🎓" },
        { name: "Kurslar", href: "/admin/courses", icon: "📚" },
        { name: "To'lovlar", href: "/admin/payments", icon: "💰" },
      ],
      Teacher: [
        { name: "Mening guruhlarim", href: "/teacher/groups", icon: "👨‍🏫" },
        { name: "Dars jadvali", href: "/teacher/schedule", icon: "📅" },
        { name: "Davomat", href: "/teacher/attendance", icon: "✅" },
        { name: "Vazifalar", href: "/teacher/assignments", icon: "📝" },
      ],
      Accountant: [
        { name: "To'lovlar", href: "/accountant/payments", icon: "💰" },
        { name: "Hisobotlar", href: "/accountant/reports", icon: "📈" },
        { name: "Qarzdorlar", href: "/accountant/debtors", icon: "📋" },
      ],
      Student: [
        { name: "Mening kurslarim", href: "/student/courses", icon: "📚" },
        { name: "Dars jadvali", href: "/student/schedule", icon: "📅" },
        { name: "Baholar", href: "/student/grades", icon: "🎯" },
        { name: "Vazifalar", href: "/student/assignments", icon: "📝" },
      ],
    }

    // If user is logged in and has admin role, show admin items, otherwise show public items
    if (user && (userRole === "SuperAdmin" || userRole === "Admin")) {
      return roleBasedItems[userRole] || publicItems
    } else if (user && roleBasedItems[userRole]) {
      return [...publicItems.slice(0, 2), ...roleBasedItems[userRole]]
    } else {
      return publicItems
    }
  }

  const navigationItems = getNavigationItems()

  if (showSuperAdminPanel && userRole === "SuperAdmin") {
    return (
      <>
        {/* SuperAdmin Panel Styles */}
        <style jsx>{`
          .superadmin-panel {
            background: linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%);
          }
          
          .nav-item {
            transition: all 0.3s ease;
          }
          
          .nav-item:hover {
            transform: translateY(-2px);
          }
        `}</style>

        {/* SuperAdmin Panel Header */}
        <header className="superadmin-panel shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">👑</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">SuperAdmin Panel</h1>
                  <p className="text-sm text-gray-200">O'quv Markazi CRM</p>
                </div>
              </div>

              <nav className="hidden lg:flex space-x-4">
                {navigationItems.slice(0, 5).map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action || (() => {})}
                    className={`nav-item flex items-center space-x-2 text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium ${
                      (item.name === "Dashboard" && currentView === "dashboard") ||
                      (item.name === "O'quvchilar" && currentView === "students") ||
                      (item.name === "Kurslar" && currentView === "courses") ||
                      (item.name === "To'lovlar" && currentView === "payments") ||
                      (item.name === "Sozlamalar" && currentView === "settings")
                        ? "bg-white bg-opacity-20"
                        : ""
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </nav>

              <div className="flex items-center space-x-4">
                <button className="text-white hover:text-yellow-300 p-2 rounded-full hover:bg-white hover:bg-opacity-20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5-5V9a6 6 0 10-12 0v3l-5 5h5m7 0v1a3 3 0 01-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => setShowSuperAdminPanel(false)}
                  className="text-white hover:text-yellow-300 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 text-sm font-medium"
                >
                  Chiqish
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* SuperAdmin Panel Content */}
        {renderSuperAdminPanel()}
      </>
    )
  }

  return (
    <>
    {/* style jsx bor */}
      <style jsx>{` 
        .header-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .nav-item {
          transition: all 0.3s ease;
          position: relative;
        }
        
        .nav-item:hover {
          transform: translateY(-2px);
        }
        
        .nav-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 50%;
          background: #10b981;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .nav-item:hover::after {
          width: 100%;
        }
        
        .mobile-menu {
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        
        .mobile-menu.open {
          transform: translateX(0);
        }
        
        .user-avatar {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }
        
        .dropdown-menu {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
        }
        
        .dropdown-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        /* Added styles for SuperAdmin features */
        .badge {
          font-size: 0.6rem;
          padding: 2px 6px;
          border-radius: 10px;
          background: linear-gradient(45deg, #3b82f6, #10b981);
          color: white;
          margin-left: 8px;
        }

        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .superadmin-header {
          background: linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%);
        }
        
        @media (max-width: 768px) {
          .nav-item::after {
            display: none;
          }
        }
      `}</style>

      {/* Header Component */}
      <header
        className={`${userRole === "SuperAdmin" ? "superadmin-header" : "bg-white"} shadow-lg border-b border-gray-200 sticky top-0 z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div
                  className={`w-10 h-10 ${userRole === "SuperAdmin" ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gradient-to-r from-blue-500 to-green-500"} rounded-lg flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-lg">{userRole === "SuperAdmin" ? "👑" : "🍽️"}</span>
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className={`text-xl font-bold ${userRole === "SuperAdmin" ? "text-white" : "text-gray-800"}`}>
                  O'quv Markazi CRM
                  {userRole === "SuperAdmin" && <span className="ml-2 text-yellow-300">⭐ SuperAdmin</span>}
                </h1>
                {userRole && (
                  <p className={`text-sm ${userRole === "SuperAdmin" ? "text-gray-200" : "text-gray-500"}`}>
                    {userRole} Panel
                  </p>
                )}
              </div>
            </div>

            {/* Desktop Navigation - Limited for SuperAdmin due to many items */}
            <nav className="hidden lg:flex space-x-4">
              {userRole === "SuperAdmin" ? (
                <>
                  <button
                    onClick={() => setShowSuperAdminPanel(true)}
                    className="nav-item flex items-center space-x-2 text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium bg-white bg-opacity-20"
                  >
                    <span>👑</span>
                    <span>SuperAdmin Panel</span>
                  </button>
                  <a
                    href="/admin/dashboard"
                    className={`nav-item flex items-center space-x-2 ${userRole === "SuperAdmin" ? "text-white hover:text-yellow-300" : "text-gray-700 hover:text-blue-600"} px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    <span>📊</span>
                    <span>Dashboard</span>
                  </a>
                  <a
                    href="/admin/users"
                    className={`nav-item flex items-center space-x-2 ${userRole === "SuperAdmin" ? "text-white hover:text-yellow-300" : "text-gray-700 hover:text-blue-600"} px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    <span>👥</span>
                    <span>Foydalanuvchilar</span>
                  </a>
                  <a
                    href="/admin/courses"
                    className={`nav-item flex items-center space-x-2 ${userRole === "SuperAdmin" ? "text-white hover:text-yellow-300" : "text-gray-700 hover:text-blue-600"} px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    <span>📚</span>
                    <span>Kurslar</span>
                  </a>
                  <a
                    href="/admin/payments"
                    className={`nav-item flex items-center space-x-2 ${userRole === "SuperAdmin" ? "text-white hover:text-yellow-300" : "text-gray-700 hover:text-blue-600"} px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    <span>💰</span>
                    <span>To'lovlar</span>
                  </a>
                </>
              ) : (
                navigationItems.slice(0, 6).map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="nav-item flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                    {item.badge && <span className="badge">{item.badge}</span>}
                  </a>
                ))
              )}
            </nav>

            {/* User Menu and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {userRole === "SuperAdmin" && notifications.length > 0 && (
                <div className="relative">
                  <button
                    className={`p-2 rounded-full ${userRole === "SuperAdmin" ? "text-white hover:bg-white hover:bg-opacity-20" : "text-gray-600 hover:bg-gray-100"} transition-colors`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-5-5V9a6 6 0 10-12 0v3l-5 5h5m7 0v1a3 3 0 01-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span className="notification-badge">{notifications.length}</span>
                  </button>
                </div>
              )}

              {/* User Profile */}
              {user ? (
                <div className="relative group">
                  <button
                    className={`flex items-center space-x-3 ${userRole === "SuperAdmin" ? "text-white hover:text-yellow-300" : "text-gray-700 hover:text-gray-900"} focus:outline-none`}
                  >
                    <div
                      className={`${userRole === "SuperAdmin" ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "user-avatar"} w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium`}
                    >
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="hidden md:block text-sm font-medium">{user.name || "Foydalanuvchi"}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="dropdown-menu group-hover:show absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      👤 Profil
                    </a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      ⚙️ Sozlamalar
                    </a>
                    {userRole === "SuperAdmin" && (
                      <>
                        <hr className="my-1" />
                        <button
                          onClick={() => setShowSuperAdminPanel(true)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          👑 SuperAdmin Panel
                        </button>
                        <a
                          href="/admin/system-health"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          🏥 Tizim holati
                        </a>
                        <a href="/admin/backup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          💾 Backup
                        </a>
                      </>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      🚪 Chiqish
                    </button>
                  </div>
                </div>
              ) : (
                <a
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Kirish
                </a>
              )}

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className={`md:hidden inline-flex items-center justify-center p-2 rounded-md ${userRole === "SuperAdmin" ? "text-white hover:bg-white hover:bg-opacity-20" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
              >
                <svg
                  className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden mobile-menu ${isMenuOpen ? "open" : ""} fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 overflow-y-auto`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div
              className={`flex items-center justify-between p-4 border-b border-gray-200 ${userRole === "SuperAdmin" ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 ${userRole === "SuperAdmin" ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gradient-to-r from-blue-500 to-green-500"} rounded-lg flex items-center justify-center`}
                >
                  <span className="text-white font-bold">{userRole === "SuperAdmin" ? "👑" : "🍽️"}</span>
                </div>
                <div>
                  <h2 className={`text-lg font-bold ${userRole === "SuperAdmin" ? "text-white" : "text-gray-800"}`}>
                    CRM {userRole === "SuperAdmin" && "⭐"}
                  </h2>
                  {userRole && (
                    <p className={`text-xs ${userRole === "SuperAdmin" ? "text-gray-200" : "text-gray-500"}`}>
                      {userRole}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-md ${userRole === "SuperAdmin" ? "text-white hover:bg-white hover:bg-opacity-20" : "text-gray-500 hover:text-gray-700"}`}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation Items */}
            <nav className="flex-1 px-4 py-4 space-y-1">
              {userRole === "SuperAdmin" ? (
                <>
                  <button
                    onClick={() => {
                      setShowSuperAdminPanel(true)
                      setIsMenuOpen(false)
                    }}
                    className="w-full flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 bg-blue-100"
                  >
                    <span className="text-lg">👑</span>
                    <span>SuperAdmin Panel</span>
                  </button>

                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Asosiy</div>
                  <a
                    href="/admin/dashboard"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">📊</span>
                    <span>Dashboard</span>
                  </a>

                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-4">
                    Foydalanuvchilar
                  </div>
                  <a
                    href="/admin/users"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">👥</span>
                    <span>Barcha foydalanuvchilar</span>
                  </a>
                  <a
                    href="/admin/teachers"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">👨‍🏫</span>
                    <span>O'qituvchilar</span>
                  </a>
                  <a
                    href="/admin/students"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">🎓</span>
                    <span>O'quvchilar</span>
                  </a>

                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-4">Ta'lim</div>
                  <a
                    href="/admin/courses"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">📚</span>
                    <span>Kurslar</span>
                  </a>
                  <a
                    href="/admin/groups"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">👨‍🎓</span>
                    <span>Guruhlar</span>
                  </a>
                  <a
                    href="/admin/schedule"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">📅</span>
                    <span>Dars jadvali</span>
                  </a>
                  <a
                    href="/admin/assignments"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">📋</span>
                    <span>Vazifalar</span>
                  </a>

                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-4">Baholash</div>
                  <a
                    href="/admin/exams"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">📝</span>
                    <span>Imtihonlar</span>
                  </a>
                  <a
                    href="/admin/grades"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">🎯</span>
                    <span>Baholar</span>
                  </a>
                  <a
                    href="/admin/attendance"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">✅</span>
                    <span>Davomat</span>
                  </a>

                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-4">Moliya</div>
                  <a
                    href="/admin/payments"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">💰</span>
                    <span>To'lovlar</span>
                  </a>
                  <a
                    href="/admin/reports"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">📈</span>
                    <span>Hisobotlar</span>
                  </a>

                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-4">Tizim</div>
                  <a
                    href="/admin/settings"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">⚙️</span>
                    <span>Sozlamalar</span>
                  </a>
                  <a
                    href="/admin/backup"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">💾</span>
                    <span>Backup</span>
                  </a>
                  <a
                    href="/admin/logs"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">📄</span>
                    <span>Loglar</span>
                  </a>
                </>
              ) : (
                navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                    {item.badge && <span className="badge">{item.badge}</span>}
                  </a>
                ))
              )}
            </nav>

            {/* Mobile User Section */}
            {user && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div
                    className={`${userRole === "SuperAdmin" ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "user-avatar"} w-10 h-10 rounded-full flex items-center justify-center text-white font-medium`}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{user.name || "Foydalanuvchi"}</p>
                    <p className="text-xs text-gray-500">{user.email || ""}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <a href="/profile" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    👤 Profil
                  </a>
                  <a href="/settings" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    ⚙️ Sozlamalar
                  </a>
                  {userRole === "SuperAdmin" && (
                    <>
                      <button
                        onClick={() => {
                          setShowSuperAdminPanel(true)
                          setIsMenuOpen(false)
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        👑 SuperAdmin Panel
                      </button>
                      <a
                        href="/admin/system-health"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        🏥 Tizim holati
                      </a>
                      <a
                        href="/admin/backup"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        💾 Backup
                      </a>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                  >
                    🚪 Chiqish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>}
      </header>
    </>
  )
}

export default Header
