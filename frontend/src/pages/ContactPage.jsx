"use client"

import { useState } from "react"
import Swal from "sweetalert2"
import Header from "../components/Header"
import { Mail, Loader2, CheckCircle } from "lucide-react"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const data = {
        access_key: "11dbead0-2c39-4194-9927-39b3a94e4456",
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success",
        })
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        })
        setTimeout(() => {
          setIsSuccess(false)
        }, 5000)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Failed to submit form. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <main className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 relative">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Get in Touch</h1>
            <p className="text-gray-600 mt-2">You can reach us anytime</p>
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">{error}</div>}

          {isSuccess && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm flex items-center gap-2">
              <CheckCircle size={20} />
              Message sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-2">
              <select className="px-3 py-3 rounded-lg border border-gray-300 bg-white text-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none">
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+62">+62</option>
                <option value="+61">+61</option>
                <option value="+86">+86</option>
                <option value="+81">+81</option>
                <option value="+82">+82</option>
                <option value="+65">+65</option>
                <option value="+60">+60</option>
                <option value="+64">+64</option>
                <option value="+55">+55</option>
                <option value="+52">+52</option>
                <option value="+33">+33</option>
                <option value="+49">+49</option>
                <option value="+39">+39</option>
                <option value="+34">+34</option>
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
                disabled={isLoading}
              />
            </div>

            <textarea
              name="message"
              placeholder="How can we help?"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              required
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative"
            >
              {isLoading ? (
                <>
                  <Loader2
                    size={20}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin"
                  />
                  <span className="opacity-0">Submit</span>
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Need immediate support? Visit our{" "}
              <a href="/ResourcePage" className="text-blue-600 hover:underline">
                Resources
              </a>{" "}
              page.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ContactPage

