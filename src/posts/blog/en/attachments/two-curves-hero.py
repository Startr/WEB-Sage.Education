#!/usr/bin/env python3
"""
Generate the "Two Curves" hero chart — oil price rising, compute cost falling.
xkcd style per vault conventions.
"""

import matplotlib.pyplot as plt
import numpy as np

# Data points
years = np.array([2020, 2021, 2022, 2023, 2024, 2025, 2026])

# Oil price (Brent crude, approximate annual averages + 2026 crisis spike)
oil_price = np.array([42, 71, 99, 83, 80, 55, 107])

# LLM inference cost ($ per million tokens, GPT-3 equivalent capability)
# Sources: a16z LLMflation data
compute_cost = np.array([60, 60, 20, 6, 0.50, 0.10, 0.06])

fig, ax1 = plt.subplots(figsize=(12, 7))

with plt.xkcd():
    fig, ax1 = plt.subplots(figsize=(12, 7))

    # Oil curve (left axis)
    color_oil = '#d63031'
    ax1.set_xlabel('Year', fontsize=14, fontweight='bold')
    ax1.set_ylabel('Brent Crude ($/barrel)', color=color_oil, fontsize=13, fontweight='bold')
    line1 = ax1.plot(years, oil_price, color=color_oil, linewidth=3.5, marker='o',
                      markersize=8, label='Oil Price ($/barrel)', zorder=5)
    ax1.tick_params(axis='y', labelcolor=color_oil, labelsize=12)
    ax1.set_ylim(0, 130)
    ax1.set_xlim(2019.5, 2026.5)

    # Annotate the 2026 spike
    ax1.annotate('Hormuz\nclosed', xy=(2026, 107), xytext=(2025.2, 120),
                fontsize=11, fontweight='bold', color=color_oil,
                arrowprops=dict(arrowstyle='->', color=color_oil, lw=2),
                ha='center')

    # Compute curve (right axis, log scale)
    ax2 = ax1.twinx()
    color_compute = '#0984e3'
    ax2.set_ylabel('LLM Inference Cost ($/M tokens)', color=color_compute, fontsize=13, fontweight='bold')
    line2 = ax2.plot(years, compute_cost, color=color_compute, linewidth=3.5, marker='s',
                      markersize=8, label='Compute Cost ($/M tokens)', zorder=5)
    ax2.set_yscale('log')
    ax2.tick_params(axis='y', labelcolor=color_compute, labelsize=12)
    ax2.set_ylim(0.01, 100)

    # Annotate the compute drop
    ax2.annotate('1000x\ncheaper', xy=(2024, 0.50), xytext=(2022.5, 0.08),
                fontsize=11, fontweight='bold', color=color_compute,
                arrowprops=dict(arrowstyle='->', color=color_compute, lw=2),
                ha='center')

    # Title
    ax1.set_title('The Two Curves\nOil rises with scarcity. Compute falls with abundance.',
                  fontsize=16, fontweight='bold', pad=20)

    # Legend
    lines = line1 + line2
    labels = [l.get_label() for l in lines]
    ax1.legend(lines, labels, loc='center left', fontsize=12,
              framealpha=0.9, edgecolor='gray')

    # Grid
    ax1.grid(True, alpha=0.3)
    ax1.set_xticks(years)

    plt.tight_layout()
    plt.savefig('portfolio/writing/attachments/hero-two-curves-draft.png',
                dpi=150, bbox_inches='tight', facecolor='white')
    print("Saved: portfolio/writing/attachments/hero-two-curves-draft.png")

plt.close()
