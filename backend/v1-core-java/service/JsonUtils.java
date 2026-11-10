package com.pathway.explorer.service;

import com.pathway.explorer.model.*;
import java.util.*;
import java.util.stream.Collectors;

public class JsonUtils {

    public static String escape(String s) {
        if (s == null) return "null";
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            switch (c) {
                case '"' -> sb.append("\\\"");
                case '\\' -> sb.append("\\\\");
                case '\b' -> sb.append("\\b");
                case '\f' -> sb.append("\\f");
                case '\n' -> sb.append("\\n");
                case '\r' -> sb.append("\\r");
                case '\t' -> sb.append("\\t");
                default -> {
                    if (c < ' ') {
                        sb.append(String.format("\\u%04x", (int) c));
                    } else {
                        sb.append(c);
                    }
                }
            }
        }
        return sb.toString();
    }

    public static String toJson(Object obj) {
        if (obj == null) return "null";
        if (obj instanceof String s) return "\"" + escape(s) + "\"";
        if (obj instanceof Number || obj instanceof Boolean) return obj.toString();
        if (obj instanceof List<?> list) {
            return "[" + list.stream().map(JsonUtils::toJson).collect(Collectors.joining(",")) + "]";
        }
        if (obj instanceof Map<?, ?> map) {
            return "{" + map.entrySet().stream()
                .map(e -> "\"" + escape(e.getKey().toString()) + "\":" + toJson(e.getValue()))
                .collect(Collectors.joining(",")) + "}";
        }
        if (obj instanceof EducationLevel l) {
            return String.format(
                "{\"id\":\"%s\",\"name\":\"%s\",\"badge\":\"%s\",\"category\":\"%s\",\"tagline\":\"%s\",\"description\":\"%s\",\"typicalAge\":\"%s\",\"keyStreamsUnlocked\":%s,\"courseIds\":%s}",
                escape(l.id()), escape(l.name()), escape(l.badge()), escape(l.category()), escape(l.tagline()), escape(l.description()), escape(l.typicalAge()),
                toJson(l.keyStreamsUnlocked()), toJson(l.courseIds())
            );
        }
        if (obj instanceof Course c) {
            return String.format(
                "{\"id\":\"%s\",\"code\":\"%s\",\"name\":\"%s\",\"degreeType\":\"%s\",\"duration\":\"%s\",\"eligibility\":\"%s\",\"costRangeGovt\":\"%s\",\"costRangePrivate\":\"%s\",\"examIds\":%s,\"careerIds\":%s,\"furtherStudies\":%s,\"description\":\"%s\",\"curriculumHighlights\":%s,\"domains\":%s,\"isPcmPrimary\":%s}",
                escape(c.id()), escape(c.code()), escape(c.name()), escape(c.degreeType()), escape(c.duration()), escape(c.eligibility()), escape(c.costRangeGovt()), escape(c.costRangePrivate()),
                toJson(c.examIds()), toJson(c.careerIds()), toJson(c.furtherStudies()), escape(c.description()), toJson(c.curriculumHighlights()), toJson(c.domains()), c.isPcmPrimary()
            );
        }
        if (obj instanceof EntranceExam e) {
            return String.format(
                "{\"id\":\"%s\",\"name\":\"%s\",\"fullName\":\"%s\",\"conductingBody\":\"%s\",\"eligibility\":\"%s\",\"frequency\":\"%s\",\"applicationMonths\":\"%s\",\"examMonths\":\"%s\",\"patternSummary\":\"%s\",\"officialUrl\":\"%s\",\"difficulty\":\"%s\",\"keyTips\":\"%s\",\"unlockedCourseIds\":%s}",
                escape(e.id()), escape(e.name()), escape(e.fullName()), escape(e.conductingBody()), escape(e.eligibility()), escape(e.frequency()), escape(e.applicationMonths()), escape(e.examMonths()),
                escape(e.patternSummary()), escape(e.officialUrl()), escape(e.difficulty()), escape(e.keyTips()), toJson(e.unlockedCourseIds())
            );
        }
        if (obj instanceof RouteStep r) {
            return String.format(
                "{\"title\":\"%s\",\"type\":\"%s\",\"description\":\"%s\",\"steps\":%s,\"typicalDuration\":\"%s\",\"requiredExamsOrPrep\":\"%s\"}",
                escape(r.title()), escape(r.type()), escape(r.description()), toJson(r.steps()), escape(r.typicalDuration()), escape(r.requiredExamsOrPrep())
            );
        }
        if (obj instanceof Career c) {
            return String.format(
                "{\"id\":\"%s\",\"title\":\"%s\",\"domain\":\"%s\",\"shortDesc\":\"%s\",\"dayToDay\":%s,\"skills\":%s,\"salaryEntry\":\"%s\",\"salaryMid\":\"%s\",\"growthOutlook\":\"%s\",\"growthReason\":\"%s\",\"courseIds\":%s,\"routes\":%s}",
                escape(c.id()), escape(c.title()), escape(c.domain()), escape(c.shortDesc()), toJson(c.dayToDay()), toJson(c.skills()),
                escape(c.salaryEntry()), escape(c.salaryMid()), escape(c.growthOutlook()), escape(c.growthReason()), toJson(c.courseIds()), toJson(c.routes())
            );
        }
        if (obj instanceof SwitchingRoute s) {
            return String.format(
                "{\"id\":\"%s\",\"title\":\"%s\",\"fromDomain\":\"%s\",\"toDomain\":\"%s\",\"commonScenario\":\"%s\",\"howToSwitch\":\"%s\",\"requirements\":\"%s\",\"timeline\":\"%s\",\"difficulty\":\"%s\",\"proTips\":%s,\"recommendedCoursesOrCerts\":%s}",
                escape(s.id()), escape(s.title()), escape(s.fromDomain()), escape(s.toDomain()), escape(s.commonScenario()), escape(s.howToSwitch()), escape(s.requirements()), escape(s.timeline()), escape(s.difficulty()),
                toJson(s.proTips()), toJson(s.recommendedCoursesOrCerts())
            );
        }
        if (obj instanceof ShortlistItem item) {
            return String.format(
                "{\"id\":\"%s\",\"type\":\"%s\",\"title\":\"%s\",\"subtitle\":\"%s\",\"domain\":\"%s\",\"dateAdded\":\"%s\",\"userNotes\":\"%s\"}",
                escape(item.id()), escape(item.type()), escape(item.title()), escape(item.subtitle()), escape(item.domain() != null ? item.domain() : ""), escape(item.dateAdded()), escape(item.userNotes() != null ? item.userNotes() : "")
            );
        }
        return "\"" + escape(obj.toString()) + "\"";
    }
}
