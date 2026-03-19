# NormalIce AI: Clinical and Administrative Data Normalization Engine

## Executive Summary
NormalIce AI is a high-fidelity prototype designed for the healthcare sector to solve the systemic challenge of unstructured clinical data. The engine provides a seamless, AI-driven pipeline that converts messy clinical notes and PDFs into structured, FHIR-compliant data bundles while automating the complex "pre-bill" revenue reconciliation process between providers and Third-Party Administrators (TPAs).

## Core Capabilities

### 1. Multimodal Ingestion and OCR
The engine utilizes a simulated LayoutLMv3 architecture to perform optical character recognition and context extraction. It handles unstructured clinical documentation, identifying spatial relationships and semantic meaning within discharge summaries and physician notes.

### 2. AI Extraction and FHIR Normalization
*   **Entity Linking:** Automatically identifies clinical conditions and procedures from free-text.
*   **Standardized Coding:** Maps clinical entities to ICD-10-CM (Diagnosis) and CPT (Procedure) terminologies with high confidence intervals.
*   **Interoperability:** Wraps all extracted data into a valid FHIR R4 Resource Bundle (Patient, Condition, and Procedure resources).
*   **Source Traceability:** Implements cryptographic-ready linking between extracted codes and specific paragraphs in the source document to ensure auditability and compliance.

### 3. Revenue Reconciliation Scrubber
*   **Medical Necessity Validation:** Checks the alignment between billed CPT codes and ICD-10 diagnoses.
*   **Automated Correction:** Features an AI-driven "Auto-Fix" mechanism to resolve CO-11 denial risks before claim submission.
*   **Instant Adjudication:** Simulates the TPA rules engine to provide a Guarantee of Payment (GOP) in under 3.5 seconds.

## Technical Architecture

### Frontend Stack
*   **Framework:** Next.js 14 (App Router)
*   **Library:** React 18
*   **Styling:** Tailwind CSS (Enterprise Design System)
*   **Icons:** Lucide-React
*   **Type Safety:** TypeScript

### UI/UX Design System
The interface follows a minimalist, Stripe-inspired aesthetic. It features a dual-mode (Light/Dark) design, high-contrast states for critical errors (amber/red), and emerald-green success indicators to provide immediate feedback during high-stakes administrative workflows.

## Installation and Deployment

### Prerequisites
*   Node.js 18.x or higher
*   npm or yarn

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the development server:
   ```bash
   npm run dev
   ```
4. Access the application at `http://localhost:3000`.

## Demonstration Workflow (The Happy Path)
1. **Ingest:** Upload a clinical document to trigger the LayoutLMv3 scanning simulation.
2. **Extract:** Review the split-screen view showing highlighted source text and real-time JSON/FHIR extraction.
3. **Reconcile:** Identify the medical necessity warning and apply the AI Auto-Fix.
4. **Adjudicate:** Submit the claim to the TPA and receive an instant adjudication result with a unique approval hash.

## Disclaimer
This application is a functional prototype designed for demonstration and hackathon purposes. The AI processing, OCR scanning, and adjudication results are simulated using controlled state logic to demonstrate the end-to-end user experience of the NormalIce Engine.
