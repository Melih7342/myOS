def recommend_distros(user_answers, all_distros):
    scored_results = []

    for distro in all_distros:
        score = 0

        # Scoring System:
        # Must-have --> 20 points
        # Very important --> 15 points
        # Important --> 10 points
        # Nice to have --> 5 points
        # 100 points are the maximum

        category = distro.get('Category', '').lower()
        price = distro.get('Price', '').lower()
        size_str = distro.get('Image Size (MB)')

        # 1. Use Case
        user_case = user_answers.get('use_case', '').lower()
        if user_case and user_case in category:
            score += 20

        # 2. Experience
        exp = user_answers.get('experience')
        if exp == 'Beginner' and distro.get('is_beginner_friendly'):
            score += 15
        elif exp == 'Intermediate' and distro.get('is_intermediate_friendly'):
            score += 5

        # 3. Popularity
        pop_pref = user_answers.get('popularity')
        pop_value = distro.get('Popularity')
        if pop_pref == "Very Important" and pop_value <= 20:
            score += 15
        elif pop_pref == "Would be nice" and pop_value <= 20:
            score += 5

        # 4. Hardware
        if user_answers.get('hardware') == 'Old' and 'old computers' in category:
            score += 15

        # 5. GUI
        if user_answers.get('GUI') == True and 'desktop' in category:
            score += 15

        # 6. Light Weight
        if user_answers.get('light_weight') == True and get_avg_size(size_str) <= 1000:
            score += 10

        # 7. Live Medium
        if user_answers.get('live_medium') == True and 'live medium' in category:
            score += 10

        # 8. Knockout: Price
        if user_answers.get('price') == True and 'free' not in price:
            score = 0

        # Only add if Score > 0
        if score > 0:
            scored_results.append({
                "name": distro.get("name"),
                "description": distro.get("description", "No description"),
                "match_score": score,
                "match_percent": min(score, 100),
                "category": distro.get("Category"),
                "price": distro.get("Price")
            })

        # Sort: Highest value first
    scored_results.sort(key=lambda x: x['match_score'], reverse=True)

    return scored_results[:3]


def get_avg_size(size_string):
    try:
        parts = size_string.split('-')
        numbers = [int(s.strip().replace(',', '')) for s in parts if s.strip().isdigit()]

        if len(numbers) == 2:
            return sum(numbers) / 2
        elif len(numbers) == 1:
            return numbers[0]
        return 0
    except:
        return 0