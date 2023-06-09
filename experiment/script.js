/* set up stuff--------------------------------------------------------------------------------------------------------------*/

		/* initialize jsPsych */
		var jsPsych = initJsPsych({
			on_finish: function () {
				window.location = "https://app.prolific.co/submissions/complete?cc=C1ASTM2P";
			},
		});

		/* global vars */
		const PREDICTION_PROMPT =
			"Type your prediction of the answer below (numbers only!):";
		const PRIOR_KNOWLEDGE_PROMPT = "How much do you know about this topic?";
		const CURIOSITY_PROMPT =
			"How much do you want to know the answer to this question?";
		const PRIOR_KNOWLEDGE_LIKERT_MIN = "Nothing at all";
		const PRIOR_KNOWLEDGE_LIKERT_MAX = "LIKE, A LOT";
		const CURIOSITY_LIKERT_MIN = "I don't care";
		const CURIOSITY_LIKERT_MAX = "TELL ME!";
		const TRIVIA_PROMPT = "Type your answer below (numbers only!):";

		var timeline = [];
		var trial_number = 1;

		var fractal_number = 1;
		var fractal_correct = false;
		var fractal_correct_tally = 0;

		var trivia_number = 1;
		var trivia_difference = 100;
		var trivia_percentage_difference = 0;
		var trivia_correct_tally = 0;

		var repeat_loop = false;

		/* get prolific subject ID */
		var prolific_id = jsPsych.data.getURLVariable("PROLIFIC_PID");
		if(prolific_id=="" || prolific_id==null){
			prolific_id = jsPsych.randomization.randomID(10);
		}

		/* get prolific session ID */
		var session_id = jsPsych.data.getURLVariable("SESSION_ID");

		/* get prolific study ID */
		var study_id = jsPsych.data.getURLVariable("STUDY_ID");

		/* add prolific ID to data */
		jsPsych.data.addProperties({
			prolific_id: prolific_id,
			session_id: session_id,
			study_id: study_id,
		});

		/* media preload */
		var preload = {
			type: jsPsychPreload,
			images: [
				"img/practice.png",
				"img/1.png",
				"img/2.png",
				"img/3.png",
				"img/4.png",
				"img/5.png",
				"img/6.png",
				"img/7.png",
				"img/8.png",
				"img/9.png",
				"img/10.png",
				"img/11.png",
				"img/12.png",
				"img/13.png",
				"img/14.png",
				"img/15.png",
				"img/16.png",
				"img/17.png",
				"img/18.png",
				"img/19.png",
				"img/20.png",
				"img/21.png",
				"img/22.png",
				"img/23.png",
				"img/24.png",
				"img/25.png",
				"img/26.png",
				"img/27.png",
				"img/28.png",
				"img/29.png",
				"img/30.png",
				"img/31.png",
				"img/32.png",
				"img/33.png",
				"img/34.png",
				"img/35.png",
				"img/36.png",
				"img/37.png",
				"img/38.png",
				"img/39.png",
				"img/40.png",
			],
		};

		/* trivia questions - stimuli for session one */
		var trivia_questions = [
			{
				question: "What year was the very first model of the iPhone released?",
				answer: "2007",
			},
			{
				question:
					"How many single hand gestures, or mudras, are used in Indian classical dance?",
				answer: "28",
			},
			{
				question: "How many books has Stephen King published?",
				answer: "65",
			},
			{question: "What is the diameter of Earth in miles?", answer: "7917.5"},
			{question: "How many tones are in the Vietnamese language?", answer: "6"},
			{question: "What year did the Berlin Wall fall?", answer: "1989"},
			{question: "How many times a day do Muslims pray?", answer: "5"},
			{question: "How many countries are in Africa?", answer: "54"},
			{question: "How much is in a Baker's Dozen?", answer: "13"},
			{
				question: "How many double stitches does a baseball have?",
				answer: "108",
			},
			{question: "How many constellations are there?", answer: "88"},
			{
				question: "In what year was the Mexican artist Frida Kahlo born?",
				answer: "1907",
			},
			{
				question: "How long is the Great Wall of China (in miles)?",
				answer: "13171",
			},
			{question: "How many bones is a human baby born with?", answer: "300"},
			{
				question:
					"How many countries in Africa have French as the official language?",
				answer: "21",
			},
			{question: "What year did the titanic sink?", answer: "1912"},
			{question: "How many books are in the Catholic Bible?", answer: "73"},
			{question: "How many main islands make up Japan?", answer: "4"},
			{
				question: "How many people are vegan globally (in millions)?",
				answer: "79",
			},
			{
				question: "In what year did the first Modern Olympic Games take place?",
				answer: "1896",
			},
			{question: "How many moons does Neptune have?", answer: "14"},
			{question: "How many lines are in a sonnet?", answer: "14"},
			{
				question: "In what year was the first Nobel Prize awarded?",
				answer: "1901",
			},
			{
				question:
					"How many native species of kangaroos are found in Australia?",
				answer: "4",
			},
			{
				question:
					"How many floors are in the Burj Khalifa, the tallest building in the world?",
				answer: "163",
			},
			{question: "How old was King Tut when he died?", answer: "19"},
			{
				question:
					"A bar mitzvah is traditionally celebrated when Jewish males turn what age?",
				answer: "13",
			},
			{
				question: "How many countries have territory in the Arctic Circle?",
				answer: "8",
			},
			{
				question:
					"How many different animals (real or imaginary) are represented in the Chinese calendar?",
				answer: "12",
			},
			{
				question:
					"How many soccer players should each team have on the field at the start of each match?",
				answer: "11",
			},
		];

		/* target fractals - implicit stimuli for session one */
		var implicit_stimuli = [
			{fractal: "img/1.png"},
			{fractal: "img/2.png"},
			{fractal: "img/3.png"},
			{fractal: "img/4.png"},
			{fractal: "img/5.png"},
			{fractal: "img/6.png"},
			{fractal: "img/7.png"},
			{fractal: "img/8.png"},
			{fractal: "img/9.png"},
			{fractal: "img/10.png"},
			{fractal: "img/11.png"},
			{fractal: "img/12.png"},
			{fractal: "img/13.png"},
			{fractal: "img/14.png"},
			{fractal: "img/15.png"},
			{fractal: "img/16.png"},
			{fractal: "img/17.png"},
			{fractal: "img/18.png"},
			{fractal: "img/19.png"},
			{fractal: "img/20.png"},
			{fractal: "img/21.png"},
			{fractal: "img/22.png"},
			{fractal: "img/23.png"},
			{fractal: "img/24.png"},
			{fractal: "img/25.png"},
			{fractal: "img/26.png"},
			{fractal: "img/27.png"},
			{fractal: "img/28.png"},
			{fractal: "img/29.png"},
			{fractal: "img/30.png"},
		];

		/* distractor fractals - stimuli for session two */
		var distractor_fractals = [
			{fractal: "img/31.png"},
			{fractal: "img/32.png"},
			{fractal: "img/33.png"},
			{fractal: "img/34.png"},
			{fractal: "img/35.png"},
			{fractal: "img/36.png"},
			{fractal: "img/37.png"},
			{fractal: "img/38.png"},
			{fractal: "img/39.png"},
			{fractal: "img/40.png"},
		];

		/* trivia stimuli randomization - session one */
		var randomized_trivia_questions = jsPsych.randomization.repeat(
			trivia_questions,
			1
		);

		/* implicit stimuli randomization - session one */
		var randomized_implicit_stimuli = jsPsych.randomization.repeat(
			implicit_stimuli,
			1
		);

		/* trivia-fractal pair stimuli randomization - session one */
		var randomized_trial_stimuli = [];

		for (let i = 0; i < randomized_trivia_questions.length; i++) {
			let question = randomized_trivia_questions[i].question;
			let answer = randomized_trivia_questions[i].answer;
			let fractal = randomized_implicit_stimuli[i].fractal;
			randomized_trial_stimuli.push({
				question: question,
				answer: answer,
				fractal: fractal,
			});
		}

		/* target fractal stimuli randomization - session two */
		var random_chosen_fractal_10_set = new Set();

		while (random_chosen_fractal_10_set.size < 10) {
			index = Math.floor(Math.random() * implicit_stimuli.length);
			random_chosen_fractal_10_set.add(implicit_stimuli[index]);
		}

		var random_chosen_fractal_10 = Array.from(random_chosen_fractal_10_set);

		/* distractor fractal stimuli randomization - session two */
		var randomized_distractor_fractals = jsPsych.randomization.repeat(
			distractor_fractals,
			1
		);

		/* target-distractor position randomization - session two */
		var fj_10_arr = ["f", "f", "f", "f", "f", "j", "j", "j", "j", "j"];
		var random_fj_10_arr = jsPsych.randomization.repeat(fj_10_arr, 1);

		/* target-distractor-pair stimuli randomization - session two */
		var implicit_test_stimuli = [];

		for (let i = 0; i < 10; i++) {
			let target = random_chosen_fractal_10[i].fractal;
			let distractor = randomized_distractor_fractals[i].fractal;
			let correct_response = random_fj_10_arr[i];
			implicit_test_stimuli.push({
				target: target,
				distractor: distractor,
				correct_response: correct_response,
			});
		}

		/* trivia memory test stimuli - session three */
		var random_chosen_trivia_10_set = new Set();

		while (random_chosen_trivia_10_set.size < 10) {
			index = Math.floor(Math.random() * trivia_questions.length);
			random_chosen_trivia_10_set.add(trivia_questions[index]);
		}

		var random_chosen_trivia_10 = Array.from(random_chosen_trivia_10_set);

		/* practice trials --------------------------------------------------------------------------------------------------------------*/

		/* present the instructions*/
		var instruction = {
			type: jsPsychHtmlKeyboardResponse,
			stimulus: `
					<p>Welcome and thank you for participating in this study!</p>
					<p>In each trial, you will be given a trivia question and then be asked to:</p><br>
					<div class="list">
					<p>1) Predict the answer</p>
					<p>2) Rate how much you already know about the topic</p>
					<p>3) Rate how much you want to know the answer</p>
					</div>
					<br>
					<p>Then, you will see a card that flips over to reveal the answer.</p>
					<br>
					<p>Let's try a practice round. Press <span style="color: red"><strong>any key</strong></span> to move to the next slide</p>
					`,
		};

		var practice_prediction = {
			type: jsPsychSurveyText,
			on_load: () => {
				document.querySelector("#input-0").type = "text";
				document
					.querySelector("#input-0")
					.addEventListener("input", function (event) {
						this.value = this.value.replace(/[^0-9]/g, "");
					});
			},
			preamble: `
					<div style="margin-top: -15%;">
					<h3>PRACTICE TRIAL</h3>
					<h2>How many legs does a lobster have?</h2>
					</div>
					`,
			questions: [
				{
					prompt: PREDICTION_PROMPT,
					name: "practice prediction",
					required: true,
				},
			],
			data: {
				task: "practice",
			},
		};

		var practice_likert = {
			type: jsPsychSurvey,
			on_load: () => {
				document.querySelector(".jspsych-content").insertAdjacentHTML(
					"afterbegin",
					`
							<div>
							<h3>PRACTICE TRIAL</h3>
							</div>
						`
				);
			},
			title: "How many legs does a lobster have?",
			pages: [
				[
					{
						type: "likert",
						prompt: PRIOR_KNOWLEDGE_PROMPT,
						name: "practice",
						required: true,
						likert_scale_min_label: PRIOR_KNOWLEDGE_LIKERT_MIN,
						likert_scale_max_label: PRIOR_KNOWLEDGE_LIKERT_MAX,
						likert_scale_values: [
							{value: 0},
							{value: 1},
							{value: 2},
							{value: 3},
							{value: 4},
							{value: 5},
						],
						data: {
							task: "practice",
						},
					},
				],
				[
					{
						type: "likert",
						prompt: CURIOSITY_PROMPT,
						required: true,
						likert_scale_min_label: CURIOSITY_LIKERT_MIN,
						likert_scale_max_label: CURIOSITY_LIKERT_MAX,
						name: "practice",
						likert_scale_values: [
							{value: 0},
							{value: 1},
							{value: 2},
							{value: 3},
							{value: 4},
							{value: 5},
						],
						data: {
							task: "practice",
						},
					},
				],
			],
		};

		var practice_result_screen = {
			type: jsPsychHtmlKeyboardResponse,
			stimulus: () => {
				return `
				<div class="flip_card">
					<div class="flip_card_inner">
						<div class="flip_card_front">
							<img src=img/practice.png>
						</div>
						<div class="flip_card_back">
							<h2>"How many legs does a lobster have?"</h2>
						    <br>
						    <p>Answer: <strong>"10"</strong></p>
					    </div>
				    </div>
			    </div>
				`;
			},
			response_ends_trial: false,
			trial_duration: 5000,
		};

		var practice_end = {
			type: jsPsychHtmlKeyboardResponse,
			stimulus: `
					<div>
					<h2>The practice round is over</h2>
					<p>Press <span style="color: red"><strong>any key</strong></span> to continue to the actual trials</p>
					<p>Good Luck!</p>
					</div>
					`,
		};

		/* trials --------------------------------------------------------------------------------------------------------------*/

		var trial_prediction = {
			type: jsPsychSurveyText,
			on_load: () => {
				document.querySelector("#input-0").type = "text";
				document
					.querySelector("#input-0")
					.addEventListener("input", function (event) {
						this.value = this.value.replace(/[^0-9]/g, "");
					});
				document.querySelector(".jspsych-content").insertAdjacentHTML(
					"afterbegin",
					`
						<div style="margin-top: -18%;">
						<h3 style="line-height: 2em;">TRIAL ${trial_number}</h3>
						</div>
					`
				);
			},
			preamble: function () {
				return "<h2>" + jsPsych.timelineVariable("question") + "</h2>";
			},
			questions: [
				{
					prompt: PREDICTION_PROMPT,
					name: "prediction",
					required: true,
				},
			],
		};

		var trial_likert = {
			type: jsPsychSurvey,
			title: function () {
				return jsPsych.timelineVariable("question");
			},
			on_load: () => {
				document.querySelector(".jspsych-content").insertAdjacentHTML(
					"afterbegin",
					`
						<div>
						<h3 style="line-height: 2em;">TRIAL ${trial_number}</h3>
						</div>
					`
				);
			},
			pages: [
				[
					{
						type: "likert",
						name: "prior knowledge",
						prompt: PRIOR_KNOWLEDGE_PROMPT,
						likert_scale_min_label: PRIOR_KNOWLEDGE_LIKERT_MIN,
						likert_scale_max_label: PRIOR_KNOWLEDGE_LIKERT_MAX,
						likert_scale_values: [
							{value: 0},
							{value: 1},
							{value: 2},
							{value: 3},
							{value: 4},
							{value: 5},
						],
						required: true,
						data: {
							task: "prior knowledge",
						},
					},
				],
				[
					{
						type: "likert",
						name: "curiosity",
						prompt: CURIOSITY_PROMPT,
						likert_scale_min_label: CURIOSITY_LIKERT_MIN,
						likert_scale_max_label: CURIOSITY_LIKERT_MAX,
						likert_scale_values: [
							{value: 0},
							{value: 1},
							{value: 2},
							{value: 3},
							{value: 4},
							{value: 5},
						],
						required: true,
						data: {
							task: "curiosity",
						},
					},
				],
			],
		};

		var result_screen = {
			type: jsPsychHtmlKeyboardResponse,
			stimulus: () => {
				return `
			<div class="flip_card">
				<div class="flip_card_inner">
					<div class="flip_card_front">
						<img src=${jsPsych.timelineVariable("fractal")}>
					</div>
					<div class="flip_card_back">
						<h2>${jsPsych.timelineVariable("question")}</h2>
						<br>
						<p>Answer: <strong>${jsPsych.timelineVariable("answer")}</strong></p>
					</div>
				</div>
			</div>
			`;
			},
			choices: "NO_KEYS",
			trial_duration: 5000,
		};

		var trial_answer = {
			type: jsPsychHtmlKeyboardResponse,
			stimulus: function () {
				var question_answer = "<div style='margin-top: 50%;'>" + "</div>";
				return question_answer;
			},
			css_classes: ["card_container"],
			choices: "NO_KEYS",
			trial_duration: 2000,
		};

		var trial_end = {
			type: jsPsychHtmlKeyboardResponse,
			stimulus: function () {
				retStr = "";
				retStr += `
					<div>
					<h2>Trial ${trial_number} is over</h2>
					<p>Press <span style="color: red"><strong>any key</strong></span> to continue to the next trial</p>
					</div>
				`;
				trial_number++;
				return retStr;
			},
		};

		/* fractal session --------------------------------------------------------------------------------------------------------------*/

		var fractal_instruction = {
			type: jsPsychHtmlKeyboardResponse,
			stimulus: `
			<h2>Good job! You've finished the 30 trials:p</h2>
			<p>In the next session, you will see two cards on the screen in each trial.</p>
			<p>On one card is a pattern that you have seen before in the experiment,
				and on the other card is one you have not seen.</p><br>
			<p>Your task is to choose the one you think you <em>have</em> seen before for every trial.</p>
			<p>Press '<span style="color: red;"><strong>F</strong></span>' to choose the card on the left,
				and '<span style="color: red;"><strong>J</strong></span>' to choose the card on the right.</p>
			<p>Have fun!</p>
			<br>
			<p>The trials will begin in 30 seconds</p>
			`,
			trial_duration: 30000,
		};

		var fractal_trial = {
			type: jsPsychHtmlKeyboardResponse,
			stimulus: () => {
				if (random_fj_10_arr[fractal_number - 1] == "f") {
					var retStr = `
						<div class="two_card_container">
						<div class="card_container">
						<img src=${jsPsych.timelineVariable("target")}>
						</div>

						<div class="card_container">
						<img src=${jsPsych.timelineVariable("distractor")}>
						</div>`;
				} else {
					var retStr = `
						<div class="two_card_container">
						<div class="card_container">
						<img src=${jsPsych.timelineVariable("distractor")}>
						</div>

						<div class="card_container">
						<img src=${jsPsych.timelineVariable("target")}>
						</div>`;
				}
				return retStr;
			},
			choices: ["f", "j"],
			data: {
				task: "response",
				correct_response: jsPsych.timelineVariable("correct_response"),
			},
			on_finish: function (data) {
				data.correct = jsPsych.pluginAPI.compareKeys(
					data.response,
					data.correct_response
				);
				if (data.correct) {
					fractal_correct = true;
					fractal_correct_tally++;
				} else {
					fractal_correct = false;
				}
			},
		};

		var fractal_answer = {
			type: jsPsychHtmlKeyboardResponse,
			stimulus: () => {
				fractal_number++;
				if (fractal_correct) {
					return `
					<p>Correct!</p>
					`;
				} else {
					return `
					<p>Wrong answer</p>
					`;
				}
			},
			choices: "NO_KEYS",
			trial_duration: 1000,
		};

		/* trivia session --------------------------------------------------------------------------------------------------------------*/
		var trivia_instruction = {
			type: jsPsychHtmlKeyboardResponse,
			stimulus: `
			<h2>Good job :p</h2>
			<p>In the next session, you will see a trivia question on the screen in each trial.</p>
			<p>Each of these trivia questions is chosen from the questions you have already seen in the first session of the experiment.</p><br>
			<p>Your task is to answer the trivia question based on what you remember as accurately as you can.</p>
			<p>Have fun!</p>
			<br>
			<p>The trials will begin in 30 seconds</p>
			`,
			trial_duration: 30000,
		};

		var trivia_trial = {
			type: jsPsychSurveyText,
			on_load: () => {
				document.querySelector("#input-0").type = "text";
				document
					.querySelector("#input-0")
					.addEventListener("input", function (event) {
						this.value = this.value.replace(/[^0-9]/g, "");
					});
				document.querySelector(".jspsych-content").insertAdjacentHTML(
					"afterbegin",
					`
						<div style="margin-top: -18%;">
						<h3 style="line-height: 2em;">TRIVIA ${trivia_number}</h3>
						</div>
					`
				);
			},
			preamble: function () {
				return "<h2>" + jsPsych.timelineVariable("question") + "</h2>";
			},
			questions: [
				{
					prompt: TRIVIA_PROMPT,
					name: "answer",
					required: true,
				},
			],
			trial_duration: 6000,
			data: {
				task: "response",
				correct_response: jsPsych.timelineVariable("answer"),
			},
			on_finish: function (data) {
				let percentage_difference = 0;
				let difference = Math.abs(data.response.answer - data.correct_response);
				if (difference >= data.correct_response) {
					percentage_difference = 100;
				} else {
					percentage_difference = Math.round(
						Math.abs(
							(data.response.answer - data.correct_response) /
								data.correct_response
						) * 100
					);
				}
				data.difference = percentage_difference;
				trivia_difference = difference;
				trivia_percentage_difference = percentage_difference;
			},
		};

		var trivia_answer = {
			type: jsPsychHtmlKeyboardResponse,
			stimulus: () => {
				trivia_number++;
				retStr = "";
				retStr += `<h2>The correct answer is ${jsPsych.timelineVariable(
					"answer"
				)}.</h2>`;
				retStr += `<p>Your answer was different from the answer by ${trivia_difference}.</p>`;
				if (trivia_difference == 0) {
					retStr += `<p>You got the right answer. Amazing work!</p>`;
					trivia_correct_tally++;
				} else if (trivia_percentage_difference <= 10) {
					retStr += `<p>Excellent. Kudos to you!</p>`;
				} else if (trivia_percentage_difference <= 30) {
					retStr += `<p>A pretty good job indeed.</p>`;
				} else if (trivia_percentage_difference <= 50) {
					retStr += `<p>Not the worst. Can you do better on the next?</p>`;
				} else {
					retStr += `<p>Not even close... do better next time!</p>`;
				}

				return retStr;
			},
			choices: "NO_KEYS",
			trial_duration: 2500,
		};

		var save_data = {
			type: jsPsychPipe,
			action: "save",
			experiment_id: "gnOCQZoXaGju",
			filename: `${prolific_id}.json`,
			data: ()=>jsPsych.data.get().json(),
		}

		var experiment_end = {
			type: jsPsychHtmlKeyboardResponse,
			stimulus: () => {
				retStr = "";
				retStr += `
					<h2>This is the end of the experiment!</h2>
					<p>Let's see how you did:</p>
					<p class="list" style="margin-left: 20%; color: #1d478c;">
						1)	Number of correct patterns chosen: ${fractal_correct_tally} / 10<br>
						2)	Number of correct trivia questions answered: ${trivia_correct_tally} / 10<br>
					</p>
					<p>Thank you so much for participanting in our experiment. We hope it was enjoyable :)</p>
					<p>Press any key to return to Prolific and complete the experiment. Goodbye!</p>
				`;
				return retStr;
			},
			//choices: "NO_KEYS",
		};

		/* timeline groups --------------------------------------------------------------------------------------------------------------*/
		var practice_session = {
			timeline: [
				practice_prediction,
				practice_likert,
				practice_result_screen,
				practice_end,
			],
		};

		var trials_session = {
			timeline: [
				trial_prediction,
				trial_likert,
				result_screen,
				// trial_answer,
				trial_end,
			],
			timeline_variables: randomized_trial_stimuli,
		};

		var fractal_session = {
			timeline: [fractal_trial, fractal_answer],
			timeline_variables: implicit_test_stimuli,
		};

		var trivia_session = {
			timeline: [trivia_trial, trivia_answer],
			timeline_variables: random_chosen_trivia_10,
		};

		/* push everything to timeline */
		timeline.push(preload);
		timeline.push(instruction);
		timeline.push(practice_session);
		timeline.push(trials_session);
		timeline.push(fractal_instruction);
		timeline.push(fractal_session);
		timeline.push(trivia_instruction);
		timeline.push(trivia_session);
		timeline.push(save_data);
		timeline.push(experiment_end);

		/* start the experiment */
		jsPsych.run(timeline);
