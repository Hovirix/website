import * as React from "react";
import { CONTACT_EMAIL, FORMSPREE_ENDPOINT } from "@/lib/site";

interface FieldError {
	name?: string;
	email?: string;
	subject?: string;
	message?: string;
}

type Status = "idle" | "loading" | "success" | "error";

function validate(data: {
	name: string;
	email: string;
	subject: string;
	message: string;
}): FieldError {
	const errors: FieldError = {};

	if (!data.name.trim()) {
		errors.name = "Name is required.";
	} else if (data.name.trim().length < 2) {
		errors.name = "Name must be at least 2 characters.";
	}

	if (!data.email.trim()) {
		errors.email = "Email is required.";
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
		errors.email = "Enter a valid email address.";
	}

	if (!data.subject.trim()) {
		errors.subject = "Subject is required.";
	} else if (data.subject.trim().length < 3) {
		errors.subject = "Subject must be at least 3 characters.";
	}

	if (!data.message.trim()) {
		errors.message = "Message is required.";
	} else if (data.message.trim().length < 20) {
		errors.message = "Message must be at least 20 characters.";
	}

	return errors;
}

function FieldMsg({ msg }: { msg?: string }) {
	if (!msg) return null;
	return (
		<p className="mt-1.5 font-mono text-[10px] tracking-wide text-destructive">
			— {msg}
		</p>
	);
}

export default function ContactForm() {
	const [fields, setFields] = React.useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [errors, setErrors] = React.useState<FieldError>({});
	const [touched, setTouched] = React.useState<Record<string, boolean>>({});
	const [status, setStatus] = React.useState<Status>("idle");

	const set =
		(field: string) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const next = { ...fields, [field]: e.target.value };
			setFields(next);
			// Re-validate touched fields live
			if (touched[field]) {
				setErrors(validate(next));
			}
		};

	const blur = (field: string) => () => {
		const nextTouched = { ...touched, [field]: true };
		setTouched(nextTouched);
		setErrors(validate(fields));
	};

	const inputClass = (field: keyof FieldError) =>
		[
			"w-full border bg-transparent px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-colors",
			touched[field] && errors[field]
				? "border-destructive focus:border-destructive"
				: "border-border focus:border-primary",
		].join(" ");

	const handleSubmit = async (
		e: Parameters<NonNullable<React.ComponentProps<"form">["onSubmit"]>>[0],
	) => {
		e.preventDefault();

		// Mark all fields touched and validate
		setTouched({ name: true, email: true, subject: true, message: true });
		const errs = validate(fields);
		setErrors(errs);

		if (Object.keys(errs).length > 0) return;

		setStatus("loading");

		try {
			const res = await fetch(FORMSPREE_ENDPOINT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(fields),
			});

			if (res.ok) {
				setStatus("success");
				setFields({ name: "", email: "", subject: "", message: "" });
				setTouched({});
				setErrors({});
			} else {
				setStatus("error");
			}
		} catch (error) {
			console.error("Contact form submission failed", error);
			setStatus("error");
		}
	};

	if (status === "success") {
		return (
			<div className="flex flex-col items-start gap-4 border-l-[3px] border-primary bg-primary/5 px-8 py-10">
				<p className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase">
					Transmitted
				</p>
				<p className="text-xl font-bold tracking-tight text-foreground">
					Message received.
				</p>
				<p className="text-sm leading-relaxed text-muted-foreground">
					I'll get back to you within a day or two. You can also reach me
					directly at{" "}
					<a
						href={`mailto:${CONTACT_EMAIL}`}
						className="text-primary underline underline-offset-4"
					>
						{CONTACT_EMAIL}
					</a>
					.
				</p>
				<button
					type="button"
					onClick={() => setStatus("idle")}
					className="mt-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase underline-offset-4 hover:text-foreground hover:underline transition-colors"
				>
					Send another →
				</button>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
			{/* Global error banner */}
			{status === "error" && (
				<div className="border border-destructive bg-destructive/5 px-5 py-4">
					<p className="font-mono text-[11px] text-destructive">
						Something went wrong. Please try again or email me directly at
						{CONTACT_EMAIL}.
					</p>
				</div>
			)}

			{/* Name + Email */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="name"
						className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground"
					>
						Name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						placeholder="Your name"
						autoComplete="name"
						value={fields.name}
						onChange={set("name")}
						onBlur={blur("name")}
						className={inputClass("name")}
					/>
					<FieldMsg msg={touched.name ? errors.name : undefined} />
				</div>

				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="email"
						className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground"
					>
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						value={fields.email}
						onChange={set("email")}
						onBlur={blur("email")}
						className={inputClass("email")}
					/>
					<FieldMsg msg={touched.email ? errors.email : undefined} />
				</div>
			</div>

			{/* Subject */}
			<div className="flex flex-col gap-1.5">
				<label
					htmlFor="subject"
					className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground"
				>
					Subject
				</label>
				<input
					id="subject"
					name="subject"
					type="text"
					placeholder="What's this about?"
					value={fields.subject}
					onChange={set("subject")}
					onBlur={blur("subject")}
					className={inputClass("subject")}
				/>
				<FieldMsg msg={touched.subject ? errors.subject : undefined} />
			</div>

			{/* Message */}
			<div className="flex flex-col gap-1.5">
				<label
					htmlFor="message"
					className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground"
				>
					Message
				</label>
				<textarea
					id="message"
					name="message"
					placeholder="Tell me about your project, idea, or question..."
					rows={8}
					value={fields.message}
					onChange={set("message")}
					onBlur={blur("message")}
					className={`${inputClass("message")} resize-none`}
				/>
				<div className="flex items-center justify-between">
					<FieldMsg msg={touched.message ? errors.message : undefined} />
					<span className="ml-auto font-mono text-[10px] text-muted-foreground tabular-nums">
						{fields.message.length}
					</span>
				</div>
			</div>

			{/* Submit */}
			<div className="flex items-center gap-4">
				<button
					type="submit"
					disabled={status === "loading"}
					className="group inline-flex items-center gap-3 border border-primary bg-primary px-6 py-3 font-mono text-xs tracking-widest uppercase text-primary-foreground transition-colors hover:bg-primary/85 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{status === "loading" ? (
						<>
							<span className="animate-pulse">Sending</span>
							<span className="opacity-60">...</span>
						</>
					) : (
						<>
							Send message
							<span className="transition-transform duration-200 group-hover:translate-x-1">
								→
							</span>
						</>
					)}
				</button>
				<span className="font-mono text-[10px] text-muted-foreground">
					No spam, ever.
				</span>
			</div>
		</form>
	);
}
