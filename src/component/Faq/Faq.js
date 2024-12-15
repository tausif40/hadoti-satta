import React from "react";

export default function Faq() {
	const faqs = [
		{
			question: "Hadoti Satta (Hadoti Satta) is a Popular Gambling Game in India",
			answer: "Hadoti Satta is a popular gambling game in India. It is a game of chance where players bet on the outcome of a randomly drawn number. The game is played by selecting a number from a matka (a pot), and then betting on whether that number will be drawn from the pot. If the number is drawn, the player wins the bet. If the number is not drawn, the player loses the bet.",
			answer2: "Hadoti Satta 143 is a popular game among gamblers in India. The game is simple to understand and easy to play. It is also a very risky game, as there is no guarantee that the number you bet on will be drawn. However, the potential rewards are high, which makes it a popular choice for many gamblers. If you are thinking of playing Hadoti Satta, it is important to understand the risks involved.The game is purely based on chance, and there is no guarantee that you will win.However, if you are willing to take the risk, Hadoti Satta can be a fun and exciting game to play"
		},
		{
			question: "Who can get Satta Batta games ?",
			answer: "Everyone (above 18+) can get Satta Batta games. Satta Batta games are one of the simplest and the easiest online games. Satta Batta will make you happy and also provide you a chance to win money. Join Hadoti Satta and win your money today!"
		},
		{
			question: "Hadoti Satta In Modern Times",
			answer: "The modern form of ‘Hadoti Satta,’ though illegal in the United States, is based on the random selection of a number by the lottery participant. This implies that ‘Hadoti Satta is yet another Keyword of popular lottery system currently in use in the country.",
			answer2: "The winner of ‘Hadoti Satta’ is the person who correctly guesses the number and is then awarded a predetermined amount of money. Several apps have appeared in the guise of playing sports games with a certain amount of betting involved from time to time.Direct betting or gambling in any form, whether offline or online, is strictly prohibited."
		},
		{
			question: "How to Win at Kalyan Matka",
			answer: "Kalyan Matka is a gambling game that is very popular in India. It is a game of chance where people bet on the outcome of a lottery. The game is played by choosing a number between 1 and 9. If the number chosen by the player matches the number drawn by the lottery, the player wins the bet.",
			answer2: "Kalyan Matka is a gambling game that is very popular in India. It is a game of chance where people bet on the outcome of a lottery. The game is played by choosing a number between 1 and 9. If the number chosen by the player matches the number drawn by the lottery, the player wins the bet.",
			answer3: "The game of Kalyan Matka is not only a game of chance but also a game of skill. The player needs to have a good understanding of the game before they start playing. There are many books and websites that offer tips and tricks on how to win at Kalyan Matka."
		},
		{
			question: "What is Hadoti Satta ?",
			
			answer: "Madhur Hadoti Satta is a type of Hadoti Satta betting. Madhur Day is a type of game that is based on luck. Madhur Bazar is one of the best satta games that players love the most. Here you can discover Madhur Morning Chart, Golden Matka Chart, Madhur Night Chart, For Madhur Bazar as basic terms. It is one of the games that are players are playing for quickly winning the money."
		},
		{
			question: "Madhur Bazar: The Ultimate Guide to Beating the Odds",
			answer: "Madhur Bazar is a popular gambling game in India. The game is played with a deck of cards and the aim is to guess the winning card The game is popular among all age groups and is considered to be a game of skill."
		},
		{
			question: "When Hadoti Satta ?`",
			answer: "In general, Matka games like Hadoti Satta typically have specific timings for when the results are announced. The results for Hadoti Satta open in the afternoon 11:45 open PM to 12:45 PM."
		},
		{
			question: "When Madhur Day or Madhur Night Result Opens?",
			answer: "The exact time of when the Madhur Satta or madhur Night result opens is between 7:45"
		},
		{
			question: "Official And Relilable Website for Madhur Hadoti Satta?",
			answer: "Hadoti Satta is a reliable source to check the Madhur result. Hadoti Satta is an official website, a trusted operator, and a reputable Matka result portal."
		},
	];


	return (
		<>
			<div className=" min-h-screen bg-gradient-to-r from-[#ddd2f7] to-[#b4e7ff] pb-6 w-full border my-12">
				<div className="">
					{/* Header */}
					<div className="text-center py-4 bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
						<h1 className="text-xl font-semibold tracking-tighter flex flex-col items-center justify-center text-white">
							<p>Game Information & Rules</p>
						</h1 >
					</div>

					<div className="max-w-7xl mx-auto">
						<div className="space-y-4">
							{faqs.map((faq, index) => (
								<div
									key={index}
									className="bg-white shadow-lg rounded-lg p-8 border border-gray-200 hover:scale-105 transform transition-transform duration-300"
								>
									<h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
										<span className="inline-block bg-purple-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-4">Q</span>
										{faq.question}
									</h2>
									<div className="text-gray-700 space-y-2 leading-relaxed text-sm">
										<p>{faq.answer}</p>
										{faq.answer2 && <p>{faq.answer2}</p>}
										{faq.answer3 && <p>{faq.answer3}</p>}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
