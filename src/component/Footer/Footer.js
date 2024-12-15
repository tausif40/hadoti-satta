import React from 'react'

function Footer() {
	return (
		<>
			<footer className="text-gray-800 ">
				<div className=" mx-auto text-center">
					{/* Disclaimer Section */}
					<div className="bg-[#ffd700] py-12">
						<div className="space-y-4 container">
							<p className="font-bold text-lg text-red-600">ⓘ Disclaimer:</p>
							<p className="text-justify">
								This Is A News Publishing Website. All The Numbers Shown In The Website Are Based On Arithmetic And Artificial Intelligence (AI) And Are Displayed On The Basis Of Zodiac Sign. This Website Has No Connection Of Any Kind With Any Gambling Establishment. The Website Has No Connection Whatsoever With Any Illegal Activity Such As Gambling, Money Laundering, Or Any Other Activity. This Website Is Completely Dependent On Google Ad Revenue. All The Information Displayed On This Website Is Taken From Internet Sources.
							</p>
							<p className="font-bold text-lg text-red-600">ⓘ अस्वीकरण:</p>
							<p className="text-justify">
								यह एक समाचार प्रकाशन वेबसाइट है। वेबसाइट में दिखाए गए सभी नंबर अंकगणित और आर्टिफिशियल इंटेलिजेंस (एआई) पर आधारित हैं और राशि चक्र के आधार पर प्रदर्शित किए गए हैं। इस वेबसाइट का किसी भी जुआ प्रतिष्ठान से किसी भी प्रकार का कोई संबंध नहीं है। वेबसाइट का किसी भी अवैध गतिविधि जैसे जुआ, मनी लॉन्ड्रिंग या किसी अन्य गतिविधि से कोई संबंध नहीं है। यह वेबसाइट पूरी तरह से गूगल ऐड रेवेन्यू पर आश्रित है, इस वेबसाइट पर प्रदर्शित होने वाली सभी जानकारी इंटरनेट स्रोतों से ली गई है।
							</p>
						</div>
					</div>

					{/* Horizontal Rule */}
					<hr className="border-gray-800 " />

					{/* Contact Section */}
					<div className='py-8 '>
						<div className="space-y-2">
							<p className="text-sm font-semibold">Hadoti Satta</p>
							<p className="text-xs">CONTACT (SITE ADMIN):-</p>
							<p className="text-xs">PROF :- VICTOR XYZ</p>
						</div>

						{/* Rights Section */}
						<div className="space-y-1">
							<p className="text-xs">ALL RIGHTS RESERVED</p>
							<p className="text-xs">© [ 2024 ]</p>
						</div>
					</div>
				</div>
			</footer>

		</>
	)
}

export default Footer